"use client"

import { useState } from "react"
import { useSearchParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { MapPin, Upload } from "lucide-react"
import { moderateContent } from "@/utils/contentModeration"
import { analyzeImage } from "@/utils/imageProcessing"
import Link from "next/link"

const capitalizeFirstLetter = (input: string) => {
  return input.charAt(0).toUpperCase() + input.slice(1).toLowerCase()
}

export default function ConnectDetails() {
  const searchParams = useSearchParams()
  const category = searchParams.get("category") ? capitalizeFirstLetter(searchParams.get("category")!) : ""
  const reason = capitalizeFirstLetter(searchParams.get("reason") || "")
  const affectedAreas = searchParams.get("affectedAreas")?.split(",").map(capitalizeFirstLetter).join(", ")

  const [location, setLocation] = useState("")
  const [message, setMessage] = useState("")
  const [messageError, setMessageError] = useState("")
  const [file, setFile] = useState<File | null>(null)
  const [insuranceFile, setInsuranceFile] = useState<File | null>(null)
  const [insuranceOption, setInsuranceOption] = useState<"upload" | "manual" | "noInsurance">("upload")
  const [insuranceDetails, setInsuranceDetails] = useState({
    namedInsured: "",
    provider: "",
    policyNumber: "",
    effectiveDate: "",
    expirationDate: "",
  })
  const [includePhoneNumber, setIncludePhoneNumber] = useState("no")
  const [phoneNumber, setPhoneNumber] = useState("")
  const [imageError, setImageError] = useState("")
  const [verificationCode, setVerificationCode] = useState("")
  const [isPhoneVerified, setIsPhoneVerified] = useState(false)
  const [showVerificationInput, setShowVerificationInput] = useState(false)

  const handleLocationShare = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords
          setLocation(`${latitude}, ${longitude}`)
        },
        (error) => {
          console.error("Error getting location:", error)
          alert("Unable to get your location. Please enter it manually.")
        },
      )
    } else {
      alert("Geolocation is not supported by your browser. Please enter your location manually.")
    }
  }

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>, fileType: "main" | "insurance") => {
    if (e.target.files && e.target.files[0]) {
      const selectedFile = e.target.files[0]
      if (fileType === "main") {
        setImageError("")
        const analysisResult = await analyzeImage(selectedFile)
        if (analysisResult.isSafe) {
          setFile(selectedFile)
        } else {
          setImageError(analysisResult.reason || "Image not allowed")
          e.target.value = "" // Clear the file input
        }
      } else if (fileType === "insurance") {
        setInsuranceFile(selectedFile)
      }
    }
  }

  const handleInsuranceDetailsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setInsuranceDetails((prev) => ({ ...prev, [name]: value }))
  }

  const handleMessageChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newMessage = e.target.value
    setMessage(newMessage)
    const moderationResult = moderateContent(newMessage)
    if (!moderationResult.isAppropriate) {
      setMessageError(`Inappropriate content detected: ${moderationResult.reason}`)
    } else {
      setMessageError("")
    }
  }

  const sendVerificationCode = () => {
    // In a real application, this would send an API request to send an SMS
    // For now, we&apos;ll just generate a random 6-digit code
    const code = Math.floor(100000 + Math.random() * 900000).toString()
    console.log(`Verification code sent: ${code}`)
    return code
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (messageError) {
      alert("Please remove inappropriate content from your message before submitting.")
      return
    }
    if (imageError) {
      alert("Please remove or replace the inappropriate image before submitting.")
      return
    }
    if (category === "Connections" && !message.trim()) {
      alert("Please enter a message or question for the Connections category.")
      return
    }
    if (includePhoneNumber === "yes" && !isPhoneVerified) {
      alert("Please verify your phone number before submitting.")
      return
    }
    // Here you would typically send the data to your backend
    console.log({
      category,
      reason: reason || affectedAreas,
      location,
      message,
      file,
      insuranceOption,
      insuranceFile: insuranceOption === "upload" ? insuranceFile : undefined,
      insuranceDetails: insuranceOption === "manual" ? insuranceDetails : undefined,
      includePhoneNumber,
      phoneNumber: includePhoneNumber === "yes" ? phoneNumber : undefined,
    })
    alert("Message sent successfully!")
    // Reset form
    setLocation("")
    setMessage("")
    setFile(null)
    setInsuranceFile(null)
    setInsuranceDetails({
      namedInsured: "",
      provider: "",
      policyNumber: "",
      effectiveDate: "",
      expirationDate: "",
    })
    setIncludePhoneNumber("no")
    setPhoneNumber("")
    setInsuranceOption("upload")
  }

  const handlePhoneNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPhoneNumber(e.target.value)
    setIsPhoneVerified(false)
    setShowVerificationInput(false)
  }

  const handleVerifyPhone = () => {
    if (verificationCode === sendVerificationCode()) {
      setIsPhoneVerified(true)
      alert("Phone number verified successfully!")
    } else {
      alert("Invalid verification code. Please try again.")
    }
  }

  return (
    <div className="w-full max-w-md space-y-8 pb-16">
      <div>
        <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-white">Let&apos;s Connect</h2>
        {category && <p className="mt-2 text-center text-lg font-semibold text-white">Category: {category}</p>}
        {(reason || affectedAreas) && (
          <p className="mt-2 text-center text-lg font-semibold text-white">
            {reason ? `Reason: ${reason}` : `Affected Areas: ${affectedAreas}`}
          </p>
        )}
      </div>
      <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
        <div className="space-y-4">
          <div>
            <Label htmlFor="location" className="text-white">
              Vehicle Location
            </Label>
            <div className="flex mt-1">
              <Input
                id="location"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                placeholder="Enter location or use device location"
                className="bg-transparent text-white placeholder-white border-white flex-grow"
              />
              <Button
                type="button"
                onClick={handleLocationShare}
                className="ml-2 bg-white text-black hover:bg-gray-200"
              >
                <MapPin className="h-4 w-4" />
              </Button>
            </div>
          </div>
          <div>
            <Label htmlFor="file-upload" className="text-white">
              {category === "Emergency"
                ? "Upload Pictures of the Emergency"
                : category === "Parking"
                  ? "Upload Pictures of the Issue"
                  : category === "Connections"
                    ? "Upload Pictures of the Vehicle Feature (Optional)"
                    : "Upload Pictures of the Vehicle Damage"}
            </Label>
            <div className="mt-1 flex items-center">
              <label
                htmlFor="file-upload"
                className="cursor-pointer bg-white text-black px-4 py-2 rounded-md hover:bg-gray-200"
              >
                <Upload className="h-4 w-4 inline-block mr-2" />
                Choose File
              </label>
              <input
                id="file-upload"
                type="file"
                accept="image/*,video/*"
                onChange={(e) => handleFileChange(e, "main")}
                className="hidden"
              />
              {file && <span className="ml-3 text-sm text-white">{file.name}</span>}
              {imageError && <p className="text-red-500 text-sm mt-1">{imageError}</p>}
            </div>
          </div>
          <div>
            <Label htmlFor="message" className="text-white">
              {category === "Connections" ? "Message or Question" : "Message (Optional)"}
            </Label>
            <Textarea
              id="message"
              value={message}
              onChange={handleMessageChange}
              placeholder="Type your message here"
              className="bg-transparent text-white placeholder-white border-white mt-1"
              rows={4}
              required={category === "Connections"}
            />
            {messageError && <p className="text-red-500 text-sm mt-1">{messageError}</p>}
          </div>
          {category === "Accident" && (
            <>
              <div className="space-y-4">
                <Label className="text-white">Insurance Information</Label>
                <RadioGroup
                  value={insuranceOption}
                  onValueChange={(value: "upload" | "manual" | "noInsurance") => setInsuranceOption(value)}
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="upload" id="upload" className="border-white text-white" />
                    <Label htmlFor="upload" className="text-white">
                      Upload Insurance Card
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="manual" id="manual" className="border-white text-white" />
                    <Label htmlFor="manual" className="text-white">
                      Enter Insurance Details Manually
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="noInsurance" id="noInsurance" className="border-white text-white" />
                    <Label htmlFor="noInsurance" className="text-white">
                      No Auto Insurance (Out Of Pocket)
                    </Label>
                  </div>
                </RadioGroup>
              </div>
              {insuranceOption === "upload" ? (
                <div>
                  <Label htmlFor="insurance-file-upload" className="text-white">
                    Upload Insurance Information
                  </Label>
                  <div className="mt-1 flex items-center">
                    <label
                      htmlFor="insurance-file-upload"
                      className="cursor-pointer bg-white text-black px-4 py-2 rounded-md hover:bg-gray-200"
                    >
                      <Upload className="h-4 w-4 inline-block mr-2" />
                      Choose File
                    </label>
                    <input
                      id="insurance-file-upload"
                      type="file"
                      accept="image/*"
                      onChange={(e) => handleFileChange(e, "insurance")}
                      className="hidden"
                    />
                    {insuranceFile && <span className="ml-3 text-sm text-white">{insuranceFile.name}</span>}
                  </div>
                </div>
              ) : insuranceOption === "manual" ? (
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="namedInsured" className="text-white">
                      Named Insured
                    </Label>
                    <Input
                      id="namedInsured"
                      name="namedInsured"
                      value={insuranceDetails.namedInsured}
                      onChange={handleInsuranceDetailsChange}
                      className="bg-transparent text-white placeholder-white border-white mt-1"
                    />
                  </div>
                  <div>
                    <Label htmlFor="provider" className="text-white">
                      Insurance Provider
                    </Label>
                    <Input
                      id="provider"
                      name="provider"
                      value={insuranceDetails.provider}
                      onChange={handleInsuranceDetailsChange}
                      className="bg-transparent text-white placeholder-white border-white mt-1"
                    />
                  </div>
                  <div>
                    <Label htmlFor="policyNumber" className="text-white">
                      Policy Number
                    </Label>
                    <Input
                      id="policyNumber"
                      name="policyNumber"
                      value={insuranceDetails.policyNumber}
                      onChange={handleInsuranceDetailsChange}
                      className="bg-transparent text-white placeholder-white border-white mt-1"
                    />
                  </div>
                </div>
              ) : (
                <p className="text-white mt-2">You have selected to handle this out of pocket.</p>
              )}
            </>
          )}
          <div className="space-y-2">
            <Label className="text-white">Include Phone Number for Return Message</Label>
            <RadioGroup value={includePhoneNumber} onValueChange={setIncludePhoneNumber}>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="yes" id="include-phone-yes" className="border-white text-white" />
                <Label htmlFor="include-phone-yes" className="text-white">
                  Yes
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="no" id="include-phone-no" className="border-white text-white" />
                <Label htmlFor="include-phone-no" className="text-white">
                  No
                </Label>
              </div>
            </RadioGroup>
            <p className="text-sm text-gray-300 mt-2">
              Note: At Krimson we value your privacy and appreciate you for reaching out to our subscriber. Krimson will
              not share your phone number with the car owner. Return messages will come from a Krimson-affiliated
              number. SMS messaging charges may apply.
            </p>
          </div>
          {includePhoneNumber === "yes" && (
            <div className="space-y-2">
              <Label htmlFor="phoneNumber" className="text-white">
                Phone Number
              </Label>
              <div className="flex space-x-2">
                <Input
                  id="phoneNumber"
                  value={phoneNumber}
                  onChange={handlePhoneNumberChange}
                  required
                  className="bg-transparent text-white placeholder-white border-white flex-grow"
                  placeholder="Enter your phone number"
                  type="tel"
                />
                <Button
                  type="button"
                  onClick={() => setShowVerificationInput(true)}
                  className="bg-white text-black hover:bg-gray-200"
                  disabled={!phoneNumber || isPhoneVerified}
                >
                  {isPhoneVerified ? "Verified" : "Verify"}
                </Button>
              </div>
              {showVerificationInput && !isPhoneVerified && (
                <div className="mt-2 space-y-2">
                  <Input
                    value={verificationCode}
                    onChange={(e) => setVerificationCode(e.target.value)}
                    placeholder="Enter 6-digit code"
                    className="bg-transparent text-white placeholder-white border-white"
                    maxLength={6}
                  />
                  <Button
                    type="button"
                    onClick={handleVerifyPhone}
                    className="bg-white text-black hover:bg-gray-200 w-full"
                  >
                    Verify Code
                  </Button>
                </div>
              )}
            </div>
          )}
        </div>
        <Button
          type="submit"
          className="w-full bg-white text-black hover:bg-gray-200"
          disabled={!!messageError || !!imageError}
        >
          Send Message
        </Button>
      </form>
      <div className="mt-12 text-center">
        <Link href="/" className="text-white hover:underline">
          Go Back
        </Link>
      </div>
      <style jsx global>{`
        .RadioGroupItem[data-state="checked"] {
          background-color: white;
        }
      `}</style>
    </div>
  )
}

