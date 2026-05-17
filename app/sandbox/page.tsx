"use client";

import { useState } from "react";
import { Bell, Settings } from "lucide-react";
import { Button } from "@/components/atoms/Button";
import { FieldShell } from "@/components/atoms/FieldShell";
import { Input } from "@/components/atoms/Input";
import { Text } from "@/components/atoms/Text";
import { EmailInput } from "@/components/molecules/EmailInput";
import { FormField } from "@/components/molecules/FormField";
import { OtpInput } from "@/components/molecules/OtpInput";
import {
	PhoneNumberInput,
	type IPhoneCountryOption,
} from "@/components/molecules/PhoneNumberInput";
import { PasswordInput } from "@/components/molecules/PasswordInput";
import { SearchInput } from "@/components/molecules/SearchInput";
import { Tabs, type ITabItem } from "@/components/molecules/Tabs";
import { LoginForm } from "@/components/organisms/LoginForm";

const phoneOptions: IPhoneCountryOption[] = [
	{
		code: "US",
		dialCode: "+1",
		label: "United States",
		flag: "🇺🇸",
	},
	{
		code: "ID",
		dialCode: "+62",
		label: "Indonesia",
		flag: "🇮🇩",
	},
	{
		code: "SG",
		dialCode: "+65",
		label: "Singapore",
		flag: "🇸🇬",
	},
	{
		code: "JP",
		dialCode: "+81",
		label: "Japan",
		flag: "🇯🇵",
	},
	{
		code: "KR",
		dialCode: "+82",
		label: "South Korea",
		flag: "🇰🇷",
	},
];

const marketTabs: ITabItem[] = [
	{ id: "all", label: "All" },
	{ id: "crypto", label: "Cryptocurrency" },
	{ id: "favorites", label: "Favorites" },
	{ id: "trending", label: "Trending" },
	{ id: "watchlist", label: "Watchlist" },
	{ id: "defi", label: "DeFi" },
];

function ShowcaseCard(props: {
	title: string;
	description?: string;
	children: React.ReactNode;
}) {
	const { title, description, children } = props;

	return (
		<section className="space-y-16 rounded-2xl border border-border-subtle bg-white p-20 shadow-[0_16px_40px_rgba(16,24,40,0.06)]">
			<div className="space-y-4">
				<Text as="h2" variant="title-medium" color="primary-body">
					{title}
				</Text>
				{description ? (
					<Text as="p" variant="body-small" color="muted">
						{description}
					</Text>
				) : null}
			</div>
			{children}
		</section>
	);
}

export default function Page() {
	const [activeTab, setActiveTab] = useState("crypto");

	return (
		<div className="min-h-screen bg-[#F8FAFC] px-16 py-40">
			<div className="mx-auto w-full max-w-6xl space-y-24">
				<div className="space-y-8">
					<Text
						as="h1"
						variant="headline-large"
						color="primary-body"
						className="text-[36px]/[44px]"
					>
						Login Component Showcase
					</Text>
					<Text as="p" variant="body-medium" color="muted">
						Example usage for the active atoms, molecules, and the login
						organism.
					</Text>
				</div>

				<div className="grid gap-24 lg:grid-cols-2">
					<ShowcaseCard
						title="Atoms"
						description="Primitive controls and typography foundations."
					>
						<div className="space-y-20">
							<div className="flex flex-wrap items-center gap-12">
								<Button><Text variant="title-medium" color="white">Primary Button</Text></Button>
								<Button variant="ghost">Ghost Button</Button>
								<Button
									variant="ghost"
									title="Notifications"
									className="size-24 rounded-sm p-0"
								>
									<Bell className="size-24" />
								</Button>
								<Button
									variant="ghost"
									title="Settings"
									className="size-24 rounded-sm p-0"
								>
									<Settings className="size-24" />
								</Button>
							</div>

							<div className="space-y-8">
								<Text as="p" variant="label-small" color="primary-body">
									Raw Input
								</Text>
								<FieldShell invalid disabled>
									<Input placeholder="Primitive input usage" />
								</FieldShell>
							</div>

							<div className="space-y-8">
								<Text as="p" variant="label-small" color="primary-body">
									Raw Form Field
								</Text>
								<FormField
									label="Nickname"
									inputId="nickname-showcase"
									helperText="Example of FormField with helper text."
								>
									<FieldShell>
										<Input id="nickname-showcase" placeholder="Enter nickname" />
									</FieldShell>
								</FormField>
							</div>
						</div>
					</ShowcaseCard>

					<ShowcaseCard
						title="Field Molecules"
						description="Form-ready fields built on the shared field system."
					>
						<div className="space-y-16">
							<EmailInput
								required
								label="Email"
								placeholder="Enter your email"
								helperText="Use your active email address."
							/>
							<PasswordInput
								required
								label="Password"
								placeholder="Enter your password"
							/>
							<PhoneNumberInput
								required
								label="Phone Number"
								options={phoneOptions}
								placeholder="Enter your phone number"
							/>
							<OtpInput
								required
								label="OTP Code"
								helperText="Enter the 6-digit code we sent to your phone."
								defaultValue="851"
							/>
						</div>
					</ShowcaseCard>

					<ShowcaseCard
						title="Data Controls"
						description="Non-form controls for tables, dashboards, and filters."
					>
						<div className="space-y-16">
							<SearchInput placeholder="Search transaction, coin, or user" />
							<Tabs
								items={marketTabs}
								value={activeTab}
								onValueChange={setActiveTab}
							/>
						</div>
					</ShowcaseCard>

					<ShowcaseCard
						title="Login Form"
						description="Complete login organism using email or phone number and password."
					>
						<LoginForm phoneOptions={phoneOptions} />
					</ShowcaseCard>
				</div>
			</div>
		</div>
	);
}
