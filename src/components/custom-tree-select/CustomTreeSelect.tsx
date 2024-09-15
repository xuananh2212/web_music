import { Button, Form, Spin, Tooltip, TreeSelect } from "antd";
import { Rule } from "antd/es/form";
import { NamePath } from "antd/es/form/interface";
import { TreeSelectProps } from "antd/lib";
import clsx from "clsx";
import { InfoCircle } from "iconoir-react";
import { debounce } from "lodash";
import React, { MouseEventHandler, useCallback, useRef, useState } from "react";
import styles from "./CustomTreeSelect.module.scss";
type Node = {
  [key: string]: any;
  children?: Node[];
};
function findByKey<T extends Node, K extends keyof T = "id">(value: T[K], nodes: T[], key: K = "id" as K): T | null {
  try {
    for (const node of nodes) {
      if (node[key] === value) {
        return node;
      }
      if (node.children && node.children.length > 0) {
        const found = findByKey(value, node.children as T[], key);
        if (found) {
          return found;
        }
      }
    }
  } catch (e) {}
  return null;
}
interface TreeNodeData {
  id: string;
  code: string;
  children?: TreeNodeData[];
  disabled?: boolean;
  [key: string]: any;
}

interface ConvertedNode {
  title: JSX.Element;
  value: string;
  key: string;
  id: string;
  disabled?: boolean;
  name?: string;
  children?: ConvertedNode[];
}

interface HeaderItem {
  ratio?: number;
  [key: string]: any;
}

export interface CustomTreeSelectProp extends Omit<TreeSelectProps, "onChange"> {
  loadOptions?: TreeNodeData[];
  treeNodeLabelProp: string;
  placeholder?: string;
  header?: HeaderItem[];
  onLoadData?: (value?: any) => Promise<TreeNodeData[]>;
  onChange?: (value: any, extraValue?: any) => void;
  multiple?: boolean;
  name: string | string[];
  rules?: Rule[] | undefined;
  label?: string;
  icon?: any;
  showButton?: boolean;
  onClickButton?: MouseEventHandler<HTMLElement> | undefined;
  allowClear?: boolean;
  treeCheckable?: boolean;
  readOnly?: boolean;
  dependencies?: NamePath[];
  help?: string;
}

function convertNode(node: TreeNodeData, header: HeaderItem[]): ConvertedNode {
  const value = node.id;
  const key = value;
  const title = (
    <div className="flex gap-3">
      {header.map((headerItem) => {
        const [headerKey] = Object.entries(headerItem)[0];
        return (
          <div
            key={`${headerKey}`}
            title={node[headerKey] !== undefined ? node[headerKey] : ""}
            className="truncate"
            style={{ flex: headerItem?.ratio || 1 }}
          >
            {node[headerKey] !== undefined ? node[headerKey] : ""}
          </div>
        );
      })}
    </div>
  );
  const convertedNode: ConvertedNode = {
    ...node,
    title: title,
    value: value,
    key: key,
    disabled: node.disabled,
    children: node.children ? node.children.map((child) => convertNode(child, header)) : [],
  };

  return convertedNode;
}

function convertData(data: TreeNodeData[], header: HeaderItem[]): ConvertedNode[] {
  if (!data?.length) return [];
  return data.map((node) => convertNode(node, header));
}

const convertHeader = (headers: HeaderItem[]): JSX.Element => (
  <div className="flex bg-color-500 text-white px-2 py-1 font-semibold row leading-[24px]">
    {headers.map((header, index) => {
      const [key, value] = Object.entries(header)[0];
      return (
        <div className="truncate" key={index} style={{ flex: header?.ratio || 1 }}>
          {value}
        </div>
      );
    })}
  </div>
);
const collectAllKeys = (nodes: ConvertedNode[]): string[] => {
  let allKeys: string[] = [];
  nodes.forEach((node) => {
    allKeys.push(node.key);
    if (node.children && node.children.length > 0) {
      allKeys = allKeys.concat(collectAllKeys(node.children));
    }
  });
  return allKeys;
};

const CustomTreeSelect: React.FC<CustomTreeSelectProp> = (props) => {
  const {
    loadOptions = [],
    placeholder,
    header = [],
    multiple,
    treeNodeLabelProp,
    onLoadData,
    readOnly,
    name,
    onChange,
    rules,
    label,
    icon: Icon,
    onClickButton,
    allowClear,
    treeCheckable,
    showCheckedStrategy,
    dependencies,
    help,
  } = props;

  const [treeData, setTreeData] = useState<ConvertedNode[]>(convertData(loadOptions, header) || []);
  const [loading, setLoading] = useState(false); // Quản lý trạng thái loading
  const [initialLoad, setInitialLoad] = useState<boolean>(false); // Biến để theo dõi lần mở đầu tiên
  const [page, setPage] = useState<number>(1);
  const [hasMore, setHasMore] = useState<boolean>(true);
  const loadedPages = useRef<Set<number>>(new Set());
  const [expandedKeys, setExpandedKeys] = useState<string[]>([]);

  const updateTreeData = (newData: ConvertedNode[]) => {
    setTreeData(newData);
    const allExpandedKeys = collectAllKeys(newData);
    setExpandedKeys(allExpandedKeys as string[]);
  };

  const handleScroll = useCallback(
    async (event: React.UIEvent<HTMLDivElement>) => {
      if (loading || !hasMore || !onLoadData) return;
      const { scrollTop, scrollHeight, clientHeight } = event.currentTarget;
      if (scrollTop + clientHeight >= scrollHeight - 10) {
        const nextPage = page + 1;
        if (loadedPages.current.has(nextPage)) return;

        setLoading(true);
        const newData = await onLoadData({
          page_index: nextPage,
        });
        const convertNewData = convertData(newData, header);

        if (newData.length === 0) {
          setHasMore(false);
        } else {
          updateTreeData([...treeData, ...convertNewData]);
          setPage(nextPage);
          loadedPages.current.add(nextPage);
        }
        setLoading(false);
      }
    },
    [loading, hasMore, onLoadData, page, header, treeData]
  );

  const dropdownRender = useCallback(
    (menu: React.ReactNode) => (
      <div className="relative">
        {convertHeader(header)}
        {initialLoad && loading ? (
          <div className="flex justify-center items-center h-12">
            <Spin />
          </div>
        ) : treeData.length === 0 && !loading ? (
          <div className="flex justify-center items-center h-12">Không có dữ liệu</div>
        ) : (
          <>
            {menu}
            {loading ? (
              <div className="absolute !w-full flex items-center justify-center left-0 -bottom-6 h-6 text-center p-2">
                <Spin />
              </div>
            ) : (
              <div className="absolute left-0 bottom-0 h-6 text-center p-2" />
            )}
          </>
        )}
      </div>
    ),
    [header, loading, treeData, initialLoad]
  );

  const handleSearch = useCallback(
    debounce(async (searchValue: string) => {
      if (!onLoadData) return;
      setLoading(true);
      try {
        const newTreeData = await onLoadData({
          keyword: searchValue,
        });
        updateTreeData(convertData(newTreeData, header));
      } finally {
        setLoading(false);
      }
    }, 300),
    [onLoadData, header]
  );

  const handleOnLoadData = useCallback(async () => {
    if (!onLoadData) return;
    try {
      setLoading(true);
      const newTreeData = await onLoadData({
        page_index: 1,
      });
      updateTreeData(convertData(newTreeData, header));
      setInitialLoad(false);
      loadedPages.current.add(1);
    } finally {
      setLoading(false);
    }
  }, [onLoadData, header]);

  const onDropdownVisibleChange = useCallback(
    (open: boolean) => {
      if (open) {
        setInitialLoad(true);
        setPage(1);
        setHasMore(true);
        loadedPages.current.clear();
        handleOnLoadData();
      } else {
        setInitialLoad(false);
      }
    },
    [handleOnLoadData]
  );

  const handleOnChange = (value: any) => {
    let extraValue;
    if (multiple && Array.isArray(value)) {
      extraValue = value.map((item: any) => findByKey(item?.value, treeData));
    } else {
      extraValue = findByKey(value?.value, treeData);
    }
    onChange?.(value, extraValue);
  };

  return (
    <div className={clsx(Icon ? styles.container : "")}>
      <Form.Item
        className={clsx(readOnly ? "pointer-events-none" : "")}
        name={name}
        label={
          help ? (
            <div className="flex items-center gap-1">
              {label}
              <Tooltip title={help}>
                <InfoCircle width={14} height={14} className="text-[#00000073]" />
              </Tooltip>
            </div>
          ) : (
            label
          )
        }
        rules={rules}
        dependencies={dependencies}
      >
        <TreeSelect
          {...TREE_SELECT_CONFIG}
          popupClassName={styles.dropdown}
          multiple={multiple}
          treeNodeLabelProp={treeNodeLabelProp}
          showSearch
          filterTreeNode={false}
          onSearch={handleSearch}
          onPopupScroll={handleScroll}
          className={styles.root}
          treeData={treeData}
          onDropdownVisibleChange={onDropdownVisibleChange}
          placeholder={placeholder}
          dropdownRender={dropdownRender}
          showCheckedStrategy={showCheckedStrategy}
          switcherIcon={null}
          treeExpandedKeys={expandedKeys}
          onTreeExpand={(keys) => {
            setExpandedKeys(keys as string[]);
          }}
          labelInValue
          treeCheckable={treeCheckable}
          allowClear={allowClear}
          onChange={handleOnChange}
        />
      </Form.Item>
      {Icon && (
        <Button
          onClick={onClickButton}
          className={readOnly ? "pointer-events-none" : "cursor-pointer"}
          icon={<Icon className="text-color-500" />}
        />
      )}
    </div>
  );
};

export default React.memo(CustomTreeSelect);

const TREE_SELECT_CONFIG: Partial<TreeSelectProps> = {
  dropdownStyle: { maxHeight: 400, paddingBottom: 24, minWidth: 200, overflow: "auto" },
};
