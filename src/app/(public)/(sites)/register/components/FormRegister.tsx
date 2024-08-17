"use client";

import CustomCard from "@/app/(public)/components/CustomCard";
import { RECAPTCHA_SITE_KEY } from "@/configs/env.config";
import { validEmail, validMaxLength, validPhoneNumber, validRequire, validVNCharacter } from "@/helpers/validate";
import { Button, Checkbox, Form, Input } from "antd";
import { Eye, EyeClosed, Lock, Mail, PhonePlus, User } from "iconoir-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react";
import ReCAPTCHA from "react-google-recaptcha";

const FormRegister = () => {
  const router = useRouter();

  const reCaptchaRef = React.useRef<any>(null);
  const [form] = Form.useForm();

  return (
    <Form size="large" form={form}>
      <CustomCard>
        <div className="flex flex-col gap-3 items-center justify-center">
          <Image className="rounded-lg" quality={100} src="/logo.webp" width={126} height={120} alt="logo" />
          <p className="opacity-45">Âm nhạc kết nối cảm xúc</p>
        </div>
        <div>Đăng ký</div>
        <div className="grid lg:grid-cols-2 gap-6 w-full">
          <div className="flex flex-col gap-5">
            <Form.Item validateFirst name="fullname" rules={[validRequire(), validMaxLength(), validVNCharacter()]}>
              <Input prefix={<User width={16} className="text-color-500" />} placeholder="Nhập họ và tên" />
            </Form.Item>
            <Form.Item validateFirst name="phone" rules={[validRequire(), validPhoneNumber()]}>
              <Input
                onChange={(event) => {
                  const { value } = event.target;
                  const filteredValue = value.replace(/[^0-9]/g, "");
                  form.setFieldValue("phone", filteredValue);
                }}
                prefix={<PhonePlus width={16} className="text-color-500" />}
                placeholder="Nhập số điện thoại"
              />
            </Form.Item>
            <Form.Item name="password" rules={[validRequire()]}>
              <Input.Password
                iconRender={(visible) => (visible ? <Eye width={16} /> : <EyeClosed width={16} />)}
                prefix={<Lock width={16} className="text-color-500" />}
                placeholder="Nhập mật khẩu"
              />
            </Form.Item>
          </div>
          <div className="flex flex-col gap-5">
            <Form.Item validateFirst name="email" rules={[validRequire(), validEmail(), validMaxLength()]}>
              <Input prefix={<Mail width={16} className="text-color-500" />} placeholder="Nhập email" />
            </Form.Item>
            <Form.Item name="address" rules={[validRequire()]}>
              <Input placeholder="Nhập địa chỉ" />
            </Form.Item>
            <Form.Item name="reset-password" rules={[validRequire()]}>
              <Input.Password
                iconRender={(visible) => (visible ? <Eye width={16} /> : <EyeClosed width={16} />)}
                prefix={<Lock width={16} className="text-color-500" />}
                placeholder="Nhập lại mật khẩu"
              />
            </Form.Item>
          </div>
        </div>
        <Form.Item name="agreed_privacy_policy" valuePropName="checked">
          <Checkbox>
            Tôi đồng ý với các điều khoản trong&nbsp;
            <Link className="text-color-500" href="/policy">
              Chính sách và quyền riêng tư
            </Link>
          </Checkbox>
        </Form.Item>
        <Form.Item name="re_captcha_token">
          <ReCAPTCHA
            ref={reCaptchaRef}
            sitekey={RECAPTCHA_SITE_KEY}
            onChange={(key) => {
              form.setFieldValue("re_captcha_token", key);
            }}
          />
        </Form.Item>
        <Button htmlType="submit" size="large" className="w-full" type="primary">
          Đăng ký
        </Button>
      </CustomCard>
    </Form>
  );
};

export default FormRegister;
