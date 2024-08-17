"use client";

import BoxLogo from "@/app/(public)/components/BoxLogo";
import CustomCard from "@/app/(public)/components/CustomCard";
import { validEmail, validRequire } from "@/helpers/validate";
import { Button, Checkbox, Form, Input } from "antd";
import { Eye, EyeClosed, Lock, Mail } from "iconoir-react";
import Image from "next/image";
import Link from "next/link";
import { toast } from "sonner";
import useMutationLogin from "../hooks/useMutationLogin";

const FormLogin = () => {
  const { initialValues, isPending, mutate } = useMutationLogin();
  return (
    <Form className="w-[450px]" size="large" onFinish={mutate} initialValues={initialValues}>
      <CustomCard>
        <BoxLogo />
        <div className="h-[46px] flex items-center justify-center w-full">
          <h2 className="text-sm">Đăng nhập</h2>
        </div>
        <div className="w-full flex flex-col gap-5">
          <Form.Item validateFirst name="email" rules={[validRequire(), validEmail()]}>
            <Input autoFocus prefix={<Mail width={16} className="text-color-500" />} placeholder="Nhập email" />
          </Form.Item>
          <Form.Item name="password" rules={[validRequire()]}>
            <Input.Password
              iconRender={(visible) => (visible ? <Eye width={16} /> : <EyeClosed width={16} />)}
              prefix={<Lock width={16} className="text-color-500" />}
              placeholder="Nhập mật khẩu"
            />
          </Form.Item>
        </div>
        <div className="w-full flex gap-6 items-center justify-between">
          <Form.Item name="isSave" valuePropName="checked">
            <Checkbox>Lưu thông tin đăng nhập</Checkbox>
          </Form.Item>
          <Link href="/forgot-password" className="flex-none text-color-500">
            Quên mật khẩu
          </Link>
        </div>
        <Button loading={isPending} htmlType="submit" size="large" className="w-full" type="primary">
          Đăng nhập
        </Button>
        <div className="w-full flex gap-6 items-center justify-between">
          <div className="flex gap-4 items-center">
            <span>Hoặc đăng nhập với:</span>
            <div className="cursor-pointer" onClick={() => toast.info("Tính năng đang phát triển.")}>
              <Image alt="google" src="/images/auth/google.png" width={20} height={20} />
            </div>
          </div>
          <Link href="/register" className="flex-none text-color-500">
            Đăng ký
          </Link>
        </div>
      </CustomCard>
    </Form>
  );
};

export default FormLogin;
