const CLASS_NAME_COLLAPSED = "ant-table-row-expand-icon-collapsed";
const CLASS_NAME_EXPANDED = "ant-table-row-expand-icon-expanded";

const expandRows = async (keys: string | string[]): Promise<void> => {
  const rowKeys = Array.isArray(keys) ? keys : [keys];
  for (const key of rowKeys) {
    const rowElement = document.querySelector<HTMLTableRowElement>(`tr[data-row-key="${key}"]`);
    if (rowElement) {
      const expandButton = rowElement.querySelector<HTMLElement>(`.${CLASS_NAME_COLLAPSED}`);
      if (expandButton) {
        expandButton.click();
        await new Promise((resolve) => setTimeout(resolve, 50));
      }
    } else {
      break;
    }
  }
};

const expandAllRows = async (): Promise<void> => {
  const expandAll = async () => {
    const buttons = Array.from(document.querySelectorAll(`.${CLASS_NAME_COLLAPSED}`)) as HTMLElement[];
    if (buttons.length > 0) {
      for (const button of buttons) {
        button.click();
      }
      await new Promise((resolve) => setTimeout(resolve, 50));
      await expandAll();
    }
  };
  await expandAll();
};

const collapseAllRows = async (): Promise<void> => {
  const buttons = Array.from(document.querySelectorAll(`.${CLASS_NAME_EXPANDED}`)) as HTMLElement[];
  for (const button of buttons) {
    button.click();
    await new Promise((resolve) => setTimeout(resolve, 0));
  }
};

export { collapseAllRows, expandAllRows, expandRows };
