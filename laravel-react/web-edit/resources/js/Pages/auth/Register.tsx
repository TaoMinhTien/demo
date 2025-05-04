import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import InputError from "@/components/input-error";
import TextLink from "@/components/text-link";
import { useForm } from "@inertiajs/react";
import { FormEventHandler } from "react";
import { cn } from "@/lib/utils";

export default function RegisterForm() {
    const { data, setData, post, processing, errors, reset } = useForm({
        name: '',
        email: '',
        password: '',
        password_confirmation: '',
        gender: '',
        address: '',
        phone: '',
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        post('/register', {
            onFinish: () => reset('password', 'password_confirmation'),
        });
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 px-4">
            <div className="w-full max-w-md bg-white dark:bg-neutral-900 p-8 rounded-2xl shadow-lg">
                <h1 className="text-3xl font-bold text-center text-gray-900 dark:text-white mb-2">
                    Tạo tài khoản
                </h1>
                <p className="text-center text-sm text-muted-foreground mb-6">
                    Điền đầy đủ thông tin để bắt đầu
                </p>

                <form onSubmit={submit} className="space-y-4">
                    <div>
                        <Label htmlFor="name">Họ tên</Label>
                        <Input
                            id="name"
                            value={data.name}
                            onChange={(e) => setData('name', e.target.value)}
                            placeholder="Nguyễn Văn A"
                            required
                        />
                        <InputError message={errors.name} />
                    </div>

                    <div>
                        <Label htmlFor="email">Email</Label>
                        <Input
                            id="email"
                            type="email"
                            value={data.email}
                            onChange={(e) => setData('email', e.target.value)}
                            placeholder="your@email.com"
                            required
                        />
                        <InputError message={errors.email} />
                    </div>

                    <div>
                        <Label htmlFor="password">Mật khẩu</Label>
                        <Input
                            id="password"
                            type="password"
                            value={data.password}
                            onChange={(e) => setData('password', e.target.value)}
                            placeholder="••••••••"
                            minLength={6}
                            required
                        />
                        <InputError message={errors.password} />
                    </div>

                    <div>
                        <Label htmlFor="password_confirmation">Nhập lại mật khẩu</Label>
                        <Input
                            id="password_confirmation"
                            type="password"
                            value={data.password_confirmation}
                            onChange={(e) => setData('password_confirmation', e.target.value)}
                            placeholder="••••••••"
                            minLength={6}
                            required
                        />
                    </div>

                    <div>
                        <Label htmlFor="gender">Giới tính</Label>
                        <select
                            id="gender"
                            value={data.gender}
                            onChange={(e) => setData('gender', e.target.value)}
                            className={cn(
                                "border-input flex h-10 w-full rounded-md border bg-transparent px-3 py-2 text-sm shadow-sm outline-none",
                                "focus:border-ring focus:ring-ring/50 focus:ring-[3px]"
                            )}
                            required
                        >
                            <option value="">Chọn giới tính</option>
                            <option value="male">Nam</option>
                            <option value="female">Nữ</option>
                            <option value="other">Khác</option>
                        </select>
                        <InputError message={errors.gender} />
                    </div>

                    <div>
                        <Label htmlFor="address">Địa chỉ</Label>
                        <Input
                            id="address"
                            value={data.address}
                            onChange={(e) => setData('address', e.target.value)}
                            placeholder="Số nhà, đường, phường/xã, quận/huyện, tỉnh/thành"
                            required
                        />
                        <InputError message={errors.address} />
                    </div>

                    <div>
                        <Label htmlFor="phone">Số điện thoại</Label>
                        <Input
                            id="phone"
                            type="tel"
                            value={data.phone}
                            onChange={(e) => setData('phone', e.target.value)}
                            placeholder="0123456789"
                            required
                        />
                        <InputError message={errors.phone} />
                    </div>

                    <Button type="submit" className="w-full" disabled={processing}>
                        {processing ? 'Đang tạo tài khoản...' : 'Tạo tài khoản'}
                    </Button>
                </form>

                <p className="mt-6 text-center text-sm text-gray-600 dark:text-gray-400">
                    Đã có tài khoản?{' '}
                    <TextLink href="/login" className="font-medium">
                        Đăng nhập ngay
                    </TextLink>
                </p>
            </div>
        </div>
    );
}
