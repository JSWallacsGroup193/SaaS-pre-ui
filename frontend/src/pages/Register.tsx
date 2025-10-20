"use client"

import type React from "react"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import Link from "next/link"
import { Eye, EyeOff, CheckCircle2, XCircle, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { cn } from "@/lib/utils"

// Password strength calculation
const calculatePasswordStrength = (password: string): "weak" | "medium" | "strong" => {
  let strength = 0
  if (password.length >= 8) strength++
  if (/[A-Z]/.test(password)) strength++
  if (/[0-9]/.test(password)) strength++
  if (/[^A-Za-z0-9]/.test(password)) strength++

  if (strength <= 1) return "weak"
  if (strength <= 3) return "medium"
  return "strong"
}

// Zod validation schema
const registerSchema = z
  .object({
    companyName: z.string().min(1, "Company name is required"),
    email: z.string().email("Invalid email address"),
    password: z
      .string()
      .min(8, "Password must be at least 8 characters")
      .regex(/[A-Z]/, "Password must contain an uppercase letter")
      .regex(/[0-9]/, "Password must contain a number")
      .regex(/[^A-Za-z0-9]/, "Password must contain a special character"),
    confirmPassword: z.string(),
    firstName: z.string().min(1, "First name is required"),
    lastName: z.string().min(1, "Last name is required"),
    phone: z.string().optional(),
    role: z.string().optional(),
    agreeToTerms: z.boolean().refine((val) => val === true, {
      message: "You must agree to the terms and privacy policy",
    }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  })

type RegisterFormData = z.infer<typeof registerSchema>

interface RegisterPageProps {
  onSubmit?: (data: RegisterFormData) => void
  isLoading?: boolean
  error?: string
  onSignIn?: () => void
}

export default function RegisterPage({
  onSubmit,
  isLoading: externalLoading,
  error: externalError,
  onSignIn,
}: RegisterPageProps = {}) {
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [passwordStrength, setPasswordStrength] = useState<"weak" | "medium" | "strong">("weak")
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)
  const [emailExists, setEmailExists] = useState(false)

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors, isValid },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
    mode: "onChange",
  })

  const password = watch("password")
  const email = watch("email")

  // Update password strength when password changes
  useState(() => {
    if (password) {
      setPasswordStrength(calculatePasswordStrength(password))
    }
  })

  // Simulate email existence check
  const checkEmailExists = async (email: string) => {
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 500))
    // For demo: mark test@example.com as existing
    setEmailExists(email === "test@example.com")
  }

  // Format phone number
  const formatPhoneNumber = (value: string) => {
    const cleaned = value.replace(/\D/g, "")
    const match = cleaned.match(/^(\d{0,3})(\d{0,3})(\d{0,4})$/)
    if (match) {
      const formatted = !match[2] ? match[1] : `(${match[1]}) ${match[2]}${match[3] ? `-${match[3]}` : ""}`
      return formatted
    }
    return value
  }

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatPhoneNumber(e.target.value)
    setValue("phone", formatted)
  }

  const onSubmitForm = async (data: RegisterFormData) => {
    setError(null)
    setSuccess(false)

    if (onSubmit) {
      onSubmit(data)
      return
    }

    // Default behavior
    setIsLoading(true)
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 2000))

      // Simulate success
      setSuccess(true)

      // Redirect after 2 seconds
      setTimeout(() => {
        window.location.href = "/dashboard"
      }, 2000)
    } catch (err) {
      setError("Failed to create account. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  const loading = externalLoading ?? isLoading
  const displayError = externalError ?? error

  const strengthColors = {
    weak: "bg-red-500",
    medium: "bg-amber-500",
    strong: "bg-emerald-500",
  }

  const strengthWidth = {
    weak: "w-1/3",
    medium: "w-2/3",
    strong: "w-full",
  }

  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center p-4">
      <div className="w-full max-w-[500px] bg-slate-700 rounded-lg shadow-xl p-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-slate-100 mb-2">OpsNex</h1>
          <p className="text-slate-400">Create your account</p>
        </div>

        {/* Success Alert */}
        {success && (
          <Alert className="mb-6 bg-emerald-500/10 border-emerald-500 text-emerald-500">
            <CheckCircle2 className="h-4 w-4" />
            <AlertDescription>Account created successfully! Redirecting to dashboard...</AlertDescription>
          </Alert>
        )}

        {/* Error Alert */}
        {displayError && (
          <Alert className="mb-6 bg-red-500/10 border-red-500 text-red-500">
            <XCircle className="h-4 w-4" />
            <AlertDescription className="flex items-center justify-between">
              <span>{displayError}</span>
              <button onClick={() => setError(null)} className="text-red-500 hover:text-red-400">
                ×
              </button>
            </AlertDescription>
          </Alert>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit(onSubmitForm)} className="space-y-6">
          {/* Company Name */}
          <div>
            <Label htmlFor="companyName" className="text-slate-100">
              Company Name <span className="text-red-500">*</span>
            </Label>
            <Input
              id="companyName"
              {...register("companyName")}
              className={cn(
                "h-12 bg-slate-700 border-slate-600 text-slate-100 focus:border-teal-500 focus:ring-teal-500",
                errors.companyName && "border-red-500",
              )}
              placeholder="Enter company name"
            />
            {errors.companyName && <p className="text-red-500 text-sm mt-1">{errors.companyName.message}</p>}
          </div>

          {/* Email */}
          <div>
            <Label htmlFor="email" className="text-slate-100">
              Email <span className="text-red-500">*</span>
            </Label>
            <Input
              id="email"
              type="email"
              {...register("email")}
              onBlur={(e) => checkEmailExists(e.target.value)}
              className={cn(
                "h-12 bg-slate-700 border-slate-600 text-slate-100 focus:border-teal-500 focus:ring-teal-500",
                (errors.email || emailExists) && "border-red-500",
              )}
              placeholder="Enter your email"
            />
            {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>}
            {emailExists && !errors.email && (
              <p className="text-red-500 text-sm mt-1">This email is already registered</p>
            )}
          </div>

          {/* Password */}
          <div>
            <Label htmlFor="password" className="text-slate-100">
              Password <span className="text-red-500">*</span>
            </Label>
            <div className="relative">
              <Input
                id="password"
                type={showPassword ? "text" : "password"}
                {...register("password")}
                className={cn(
                  "h-12 bg-slate-700 border-slate-600 text-slate-100 focus:border-teal-500 focus:ring-teal-500 pr-10",
                  errors.password && "border-red-500",
                )}
                placeholder="Enter password"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-300"
              >
                {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
              </button>
            </div>

            {/* Password Strength Indicator */}
            {password && (
              <div className="mt-2">
                <div className="h-2 bg-slate-600 rounded-full overflow-hidden">
                  <div
                    className={cn(
                      "h-full transition-all duration-300",
                      strengthColors[passwordStrength],
                      strengthWidth[passwordStrength],
                    )}
                  />
                </div>
                <p className="text-xs text-slate-400 mt-1 capitalize">Strength: {passwordStrength}</p>
              </div>
            )}

            {/* Password Requirements */}
            <div className="mt-2 space-y-1">
              <p className={cn("text-xs", password?.length >= 8 ? "text-emerald-500" : "text-slate-400")}>
                {password?.length >= 8 ? "✓" : "○"} At least 8 characters
              </p>
              <p className={cn("text-xs", /[A-Z]/.test(password || "") ? "text-emerald-500" : "text-slate-400")}>
                {/[A-Z]/.test(password || "") ? "✓" : "○"} One uppercase letter
              </p>
              <p className={cn("text-xs", /[0-9]/.test(password || "") ? "text-emerald-500" : "text-slate-400")}>
                {/[0-9]/.test(password || "") ? "✓" : "○"} One number
              </p>
              <p className={cn("text-xs", /[^A-Za-z0-9]/.test(password || "") ? "text-emerald-500" : "text-slate-400")}>
                {/[^A-Za-z0-9]/.test(password || "") ? "✓" : "○"} One special character
              </p>
            </div>

            {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>}
          </div>

          {/* Confirm Password */}
          <div>
            <Label htmlFor="confirmPassword" className="text-slate-100">
              Confirm Password <span className="text-red-500">*</span>
            </Label>
            <div className="relative">
              <Input
                id="confirmPassword"
                type={showConfirmPassword ? "text" : "password"}
                {...register("confirmPassword")}
                className={cn(
                  "h-12 bg-slate-700 border-slate-600 text-slate-100 focus:border-teal-500 focus:ring-teal-500 pr-10",
                  errors.confirmPassword && "border-red-500",
                )}
                placeholder="Confirm password"
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-300"
              >
                {showConfirmPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
              </button>
            </div>
            {errors.confirmPassword && <p className="text-red-500 text-sm mt-1">{errors.confirmPassword.message}</p>}
          </div>

          {/* First Name & Last Name */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="firstName" className="text-slate-100">
                First Name <span className="text-red-500">*</span>
              </Label>
              <Input
                id="firstName"
                {...register("firstName")}
                className={cn(
                  "h-12 bg-slate-700 border-slate-600 text-slate-100 focus:border-teal-500 focus:ring-teal-500",
                  errors.firstName && "border-red-500",
                )}
                placeholder="First name"
              />
              {errors.firstName && <p className="text-red-500 text-sm mt-1">{errors.firstName.message}</p>}
            </div>

            <div>
              <Label htmlFor="lastName" className="text-slate-100">
                Last Name <span className="text-red-500">*</span>
              </Label>
              <Input
                id="lastName"
                {...register("lastName")}
                className={cn(
                  "h-12 bg-slate-700 border-slate-600 text-slate-100 focus:border-teal-500 focus:ring-teal-500",
                  errors.lastName && "border-red-500",
                )}
                placeholder="Last name"
              />
              {errors.lastName && <p className="text-red-500 text-sm mt-1">{errors.lastName.message}</p>}
            </div>
          </div>

          {/* Phone Number */}
          <div>
            <Label htmlFor="phone" className="text-slate-100">
              Phone Number (Optional)
            </Label>
            <Input
              id="phone"
              {...register("phone")}
              onChange={handlePhoneChange}
              className="h-12 bg-slate-700 border-slate-600 text-slate-100 focus:border-teal-500 focus:ring-teal-500"
              placeholder="(XXX) XXX-XXXX"
              maxLength={14}
            />
          </div>

          {/* Role/Job Title */}
          <div>
            <Label htmlFor="role" className="text-slate-100">
              Role/Job Title (Optional)
            </Label>
            <Select onValueChange={(value) => setValue("role", value)}>
              <SelectTrigger className="h-12 bg-slate-700 border-slate-600 text-slate-100 focus:border-teal-500 focus:ring-teal-500 w-full">
                <SelectValue placeholder="Select your role" />
              </SelectTrigger>
              <SelectContent className="bg-slate-700 border-slate-600">
                <SelectItem value="owner" className="text-slate-100">
                  Owner
                </SelectItem>
                <SelectItem value="manager" className="text-slate-100">
                  Manager
                </SelectItem>
                <SelectItem value="technician" className="text-slate-100">
                  Technician
                </SelectItem>
                <SelectItem value="dispatcher" className="text-slate-100">
                  Dispatcher
                </SelectItem>
                <SelectItem value="admin" className="text-slate-100">
                  Administrator
                </SelectItem>
                <SelectItem value="other" className="text-slate-100">
                  Other
                </SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Terms & Privacy Checkbox */}
          <div className="flex items-start space-x-2">
            <Checkbox
              id="agreeToTerms"
              onCheckedChange={(checked) => setValue("agreeToTerms", checked as boolean)}
              className="mt-1 border-slate-600 data-[state=checked]:bg-teal-500 data-[state=checked]:border-teal-500"
            />
            <div className="flex-1">
              <Label
                htmlFor="agreeToTerms"
                className={cn("text-sm text-slate-300 cursor-pointer", errors.agreeToTerms && "text-red-500")}
              >
                I agree to the{" "}
                <Link href="/terms" className="text-teal-500 hover:text-teal-400 underline">
                  Terms of Service
                </Link>{" "}
                and{" "}
                <Link href="/privacy" className="text-teal-500 hover:text-teal-400 underline">
                  Privacy Policy
                </Link>
              </Label>
              {errors.agreeToTerms && <p className="text-red-500 text-sm mt-1">{errors.agreeToTerms.message}</p>}
            </div>
          </div>

          {/* Create Account Button */}
          <Button
            type="submit"
            disabled={!isValid || loading || emailExists}
            className="w-full h-12 bg-teal-500 hover:bg-teal-600 text-white font-medium disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? (
              <>
                <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                Creating Account...
              </>
            ) : (
              "Create Account"
            )}
          </Button>
        </form>

        {/* Footer */}
        <div className="mt-6 text-center">
          <p className="text-slate-400 text-sm">
            Already have an account?{" "}
            <Link
              href="/login"
              onClick={(e) => {
                if (onSignIn) {
                  e.preventDefault()
                  onSignIn()
                }
              }}
              className="text-teal-500 hover:text-teal-400 font-medium"
            >
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}
