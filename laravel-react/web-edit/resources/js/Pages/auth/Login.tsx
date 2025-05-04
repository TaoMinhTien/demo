import React, { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import TextLink from '@/components/text-link';
import { useForm } from '@inertiajs/react';

export default function LoginForm() {
  const { data, setData, post, processing, errors } = useForm({
    email: '',
    password: '',
    remember: false,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    post('/login');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 px-4">
      <div className="w-full max-w-md bg-white dark:bg-neutral-900 p-8 rounded-2xl shadow-lg">
        <h1 className="text-3xl font-bold text-center text-gray-900 dark:text-white mb-6">
          Đăng nhập
        </h1>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="your@example.com"
              value={data.email}
              onChange={(e) => setData('email', e.target.value)}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="password">Mật khẩu</Label>
            <Input
              id="password"
              type="password"
              placeholder="********"
              value={data.password}
              onChange={(e) => setData('password', e.target.value)}
              required
            />
          </div>

          <div className="flex items-center justify-between">
            <label className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-300">
              <Checkbox
                 checked={data.remember}
                 onCheckedChange={(checked) => setData('remember', !!checked)}
              />
              Ghi nhớ đăng nhập
            </label>

            <TextLink href="/forgot-password" className="text-sm">
              Quên mật khẩu?
            </TextLink>
          </div>

          <Button type="submit" className="w-full">
            Đăng nhập
          </Button>
        </form>

        <p className="mt-6 text-center text-sm text-gray-600 dark:text-gray-400">
          Chưa có tài khoản?{' '}
          <TextLink href="/register"  className="font-medium">
            Đăng ký ngay
          </TextLink>
        </p>
      </div>
    </div>
  );
}
