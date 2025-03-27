import { AppBar } from "@/components/AppBar";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { useState } from "react";

export default function MoreInfoPage() {
  const [selectedTab, setSelectedTab] = useState("parent");

  const child = {
    name: "John Doe",
    dob: "2020-05-15",
    isPremature: true,
    weeksPremature: 3,
    severity: 1,
  };

  const parent = {
    name: "Emily Johnson",
    email: "emily.johnson@example.com",
    contact: "+1 234 567 890",
    address: "123 Main St, Springfield",
    pincode: "123456",
  };

  return (
    <div className="p-6 space-y-6 w-full mx-auto">
      <AppBar title="About Child" description="View Child details here"/>
      {/* Child Details */}
      <div className="pb-4 bg-primary-main/80 rounded-lg text-white p-5">
        <p className="text-lg">Name: {child.name}</p>
        <p className="text-lg">Date of Birth: {child.dob}</p>
        <p className="text-lg">
          Premature: {child.isPremature ? `${child.weeksPremature} weeks` : "No"}
        </p>
        <p className="text-lg">Severity: {child.severity}</p>
      </div>

      <Tabs defaultValue={selectedTab} onValueChange={setSelectedTab} className="w-full">
        <TabsList className="flex border-b justify-start space-x-4">
          <TabsTrigger value="parent" className="px-4 py-2">Parent Details</TabsTrigger>
          <TabsTrigger value="precautions" className="px-4 py-2">Precautions</TabsTrigger>
        </TabsList>

        <TabsContent value="parent" className="pt-4 space-y-2">
          <h3 className="text-xl font-semibold">Parent Information</h3>
          <p className="text-lg">Name: {parent.name}</p>
          <p className="text-lg">Email: {parent.email}</p>
          <p className="text-lg">Contact: {parent.contact}</p>
          <p className="text-lg">Address: {parent.address}</p>
          <p className="text-lg">Pincode: {parent.pincode}</p>
        </TabsContent>

        <TabsContent value="precautions" className="pt-4 space-y-2">
          <h3 className="text-xl font-semibold">Precautionary Measures</h3>
          <ul className="list-disc pl-6 space-y-2">
            <li>Ensure regular medical checkups.</li>
            <li>Maintain a clean and safe environment.</li>
            <li>Provide proper nutrition and hydration.</li>
            <li>Monitor the child's growth and development closely.</li>
          </ul>
        </TabsContent>
      </Tabs>
    </div>
  );
}
