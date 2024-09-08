"use client";

import BoxLogo from "@/app/(public)/components/BoxLogo";
import CustomCard from "@/app/(public)/components/CustomCard";
import TabTopLegacy from "@/app/(public)/components/TabTopLegacy";
import { validEmail, validMaxLength, validRequire } from "@/helpers/validate";
import { ForgotPasswordReq } from "@/services/music";
import UserService from "@/services/music/UserService";
import { useMutation } from "@tanstack/react-query";
import { Button, Form, Input } from "antd";
import { ArrowRightCircle, Mail } from "iconoir-react";
import moment from "moment";
import { useState } from "react";
import Countdown from "react-countdown";

const FormForgotPassword = () => {
  const [cachedData, setCachedData] = useState<any>(null);

  const { mutate, isPending } = useMutation({
    mutationFn: async (values: ForgotPasswordReq) => {
      const res = await UserService.forgotPassword(values);
      return {
        data: res?.data,
        timeToNext: moment().add(2, "minutes").toDate(),
      };
    },
    onSuccess: (data) => {
      if (data) {
        setCachedData(data);
      }
    },
  });

  const [form] = Form.useForm();
  const email = Form.useWatch("email", {
    form: form,
    preserve: true,
  });

  return (
    <Form form={form} size="large" onFinish={mutate}>
      <CustomCard className="lg:w-[400px] pb-12">
        <BoxLogo />
        <TabTopLegacy>Quên mật khẩu</TabTopLegacy>
        {cachedData ? (
          <>
            <div className="text-center opacity-85 leading-6">
              <div>Yêu cầu đặt lại mật khẩu đã được gửi đến email.</div>
              <div>Vui lòng kiểm tra email.</div>
            </div>
            <Countdown
              key={moment(cachedData.timeToNext).format()}
              date={cachedData.timeToNext}
              renderer={({ completed, minutes, seconds }) => {
                if (completed) {
                  return (
                    <Button onClick={() => mutate({ email })} className="text-color-500" type="text">
                      Gửi lại
                    </Button>
                  );
                }
                return (
                  <div className="mt-1 text-[#737373] flex items-center gap-1">
                    <span>Gửi lại trong</span>
                    <span className="font-semibold text-black">
                      {String(minutes).padStart(2, "0")}:{String(seconds).padStart(2, "0")}
                    </span>
                    <span>phút</span>
                  </div>
                );
              }}
            />
          </>
        ) : (
          <>
            <div className="text-center opacity-85 leading-6">
              <div>Mã đặt lại mật khẩu sẽ được gửi đến email.</div>
              <div>Vui lòng nhập email đăng ký của bạn.</div>
            </div>

            <div className="w-full flex flex-col gap-5">
              <Form.Item validateFirst name="email" rules={[validRequire(), validEmail(), validMaxLength()]}>
                <Input prefix={<Mail width={16} className="text-color-500" />} placeholder="Nhập email" />
              </Form.Item>
            </div>
          </>
        )}

        {!cachedData && (
          <Button
            loading={isPending}
            htmlType="submit"
            size="large"
            icon={<ArrowRightCircle width={24} />}
            type="primary"
          >
            Tiếp tục
          </Button>
        )}
      </CustomCard>
    </Form>
  );
};

export default FormForgotPassword;
