"use client";
import { Input } from "../components/ui/input"; // Assuming this path is correct
import { Label } from "../components/ui/label"; // Assuming this path is correct
import { Button } from "../components/ui/button"; // Assuming this path is correct
import {
	showErrorToast,
} from "../components/common/ToastNotification";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import {
	Form,
	useActionData,
	useNavigation,
	useSearchParams,
	Link,
	useSubmit,
	useLocation
} from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";
import {
	useSignupMutation,
	useLoginMutation,
} from "../state/restaurants/consumerApi";
import { toast } from "react-toastify";

export default function SignUpPage() {
	const navigation = useNavigation();
	const location = useLocation();
	const isConsumerRoute = location.pathname.toLowerCase().includes("consumer");
	const submit = useSubmit();
	const isSubmitting = navigation.state === "submitting";
	const actionData = useActionData(); // Data returned from the action
	const [searchParams] = useSearchParams();
	const mode = searchParams.get("mode") || "login";
	const isLoginMode = mode === "login";
	const navigate = useNavigate();

	const {
		register,
		handleSubmit, // We will still use handleSubmit for client-side validation
		formState: { errors },
		getValues,
	} = useForm();

	const [isView, setIsView] = useState(false);
	const [isView2, setIsView2] = useState(false);


	useEffect(() => {
		if (actionData) {
			console.log(actionData.errors);
		}
	});
	const [signup] = useSignupMutation();
	const [login] = useLoginMutation();

	const handleClientSideValidation = async (data) => {
		const formData = new FormData();
		for (const key in data) {
			formData.append(key, data[key]);
		}
		let response = {};
		if (isLoginMode) {
			response = await login(formData).unwrap();
		} else {
			response = await signup(formData).unwrap();
		}
    console.log(response, response.user)
		if (isLoginMode) {
			if (response.success) {
				toast.success("User login successfully!");
        localStorage.setItem("user",JSON.stringify(response.user))
				navigate("/users");
			} else {
				toast.error("Enter valid credential!");
			}
		} else {
			if (response.success) {
				toast.success("User created successfully!");
				navigate("/consumer?mode=login");
			} else {
				toast.error("Could not create user check the data again");
			}
		
		}
	};

	return (
		<div className="min-h-screen flex font-inter">
			<div className="w-full flex items-center justify-center p-8">
				<div className="max-w-lg w-full space-y-6 bg-white p-8 rounded-lg shadow-lg">
					{actionData && actionData.message && !actionData.errors && (
						<p className="text-red-600 text-center text-sm mb-4">
							{actionData.message}
						</p>
					)}

					<Form
						className="p-5 md:p-8"
						action={isLoginMode ? "?mode=login" : "?mode=signup"}
						method="POST"
						onSubmit={handleSubmit(handleClientSideValidation)}
					>
						<div className="flex flex-col gap-4">
							<div className="flex flex-col items-center text-center">
								<h1 className="text-3xl font-bold text-black-500">
									{" "}
									{isLoginMode ? "Welcome back" : "Welcome"}
								</h1>
								<p className="text-muted-foreground text-balance text-gray-600 mt-2">
									{isLoginMode
										? "Login to your RestroNet user account"
										: "Sign up for a new RestroNet user account"}
								</p>
							</div>
							<div className="grid gap-1">
								<Label htmlFor="email" className="text-gray-700 mb-2">
									Email
								</Label>
								<Input
									id="email"
									type="email"
									name="email"
									placeholder="m@example.com"
									className="rounded-md border border-gray-300 focus:ring-blue-500 focus:border-blue-500"
									{...register("email", {
										required: "Email is required",
										pattern: {
											value:
												/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
											message: "Invalid email address",
										},
									})}
								/>
								{errors.email && (
									<small className="text-red-600 text-sm">
										{errors.email.message}
									</small>
								)}
							</div>

							{!isLoginMode && (
								<div className="grid gap-1">
									<Label htmlFor="username" className="text-gray-700 mb-2">
										Fullname
									</Label>
									<Input
										id="username"
										type="text"
										placeholder="John Doe"
										className="rounded-md border border-gray-300 focus:ring-blue-500 focus:border-blue-500"
										{...register("username", {
											required: "Fullname is required",
										})}
									/>
									{errors.username && (
										<small className="text-red-600 text-sm">
											{errors.username.message}
										</small>
									)}
								</div>
							)}

							{!isLoginMode && (
								<div className="grid gap-1">
									<Label htmlFor="phone" className="text-gray-700 mb-2">
										Phone Number
									</Label>
									<Input
										id="phone"
										type="number"
										name="phone"
										placeholder="Enter phone number"
										className="rounded-md border border-gray-300 focus:ring-blue-500 focus:border-blue-500"
										{...register("phone")}
									/>
									{errors.phone && (
										<small className="text-red-600 text-sm">
											{errors.phone.message}
										</small>
									)}
								</div>
							)}

							<div className="relative">
								<Label htmlFor="password" className="text-gray-700 mb-3">
									Password
								</Label>
								<Input
									id="password"
									type={isView ? "text" : "password"}
									name="password"
									className="rounded-md border border-gray-300 focus:ring-blue-500 focus:border-blue-500 pr-10"
									{...register("password", {
									required: "Password is required",
									minLength: {
										value: 8,
										message: "Password should be at least 8 characters long",
									},
									pattern: {
										value:
										/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
										message:
										"Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character",
									},
									})}
								/>

								{/* Eye / EyeOff icon inside input */}
								<div className="absolute right-3 top-2/3 -translate-y-1/2 cursor-pointer text-gray-500">
									{isView ? (
									<Eye size={16} className="text-red-400" onClick={() => setIsView(!isView)} />
									) : (
									<EyeOff size={16} onClick={() => setIsView(!isView)} />
									)}
								</div>
							</div>
							  {errors.password && (
									<small className="text-red-600 text-sm">{errors.password.message}</small>
								)}


							{!isLoginMode && (
								<div>
									<div className="grid gap-1 relative">
									<Label htmlFor="confirmPassword" className="text-gray-700 mb-2">
										Confirm Password
									</Label>
									<Input
										id="confirmPassword"
										type={isView2 ? "text" : "password"}

										className="rounded-md border border-gray-300 focus:ring-blue-500 focus:border-blue-500"
										{...register("confirmPassword", {
											required: "Confirm Password is required",
											validate: (value) =>
												value === getValues("password") ||
												"Passwords do not match",
										})}
									/>
									 {/* Eye / EyeOff icon inside input */}
									<div className="absolute right-3 top-2/3 -translate-y-1/2 cursor-pointer text-gray-500">
										{isView2 ? (
										<Eye size={16} className="text-red-400" onClick={() => setIsView2(!isView2)} />
										) : (
										<EyeOff size={16} onClick={() => setIsView2(!isView2)} />
										)}
									</div>
								</div>
									{errors.confirmPassword && (
										<small className="text-red-600 text-sm">
											{errors.confirmPassword.message}
										</small>
									)}
							</div>
							)}

							<Button
								type="submit"
								className="w-full bg-red-600 hover:bg-red-700 text-white font-semibold rounded-lg transition duration-200 mt-6 cursor-pointer"
								disabled={isSubmitting}
							>
								{isSubmitting
									? "Submitting..."
									: isLoginMode
									? "Login"
									: "Sign Up"}
							</Button>

							<div className="text-center text-sm text-gray-600 mt-4 cursor-pointer">
								{isLoginMode ? (
									<>
									<Link to="/forget-password" className="font-bold text-red-600 hover:underline hover:underline-offset-4">
										Forgot password?
									</Link>

									<br/>
									
									
										Don&apos;t have an account?{" "}
										<Link
											to="/consumer?mode=signup"
											className="font-bold text-blue-600 hover:underline hover:underline-offset-4"
										>
											Sign up
										</Link>
										
									</>
								) : (
									<>
										Already have an account?{" "}
										<Link
											to="/consumer?mode=login"
											className="font-bold text-blue-600 hover:underline hover:underline-offset-4"
										>
											Login
										</Link>
									</>
								)}
							</div>
						</div>
					</Form>
				</div>
			</div>
		</div>
	);
}
