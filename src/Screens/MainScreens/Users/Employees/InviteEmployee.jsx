/* eslint-disable no-unused-vars */
import { FormWrapper } from "@antopolis/admin-component-library/dist/form";
import {
  EmailInput,
  ShortTextInput,
} from "@antopolis/admin-component-library/dist/inputs";
import { Loader2 } from "lucide-react";
import { useState } from "react";
import { Button } from "@antopolis/admin-component-library/dist/ui";
import { toast } from "@antopolis/admin-component-library/dist/hooks";
import { useAxiosInstance } from "../../../../Hooks/Instances/useAxiosInstance";
import { MANAGE_EMPLOYEE_API } from "../../../../Utilities/APIs/APIs";

export default function InviteEmployee({
  setCreateModal,
  toggleFetch,
  ...props
}) {
  const [isLoading, setIsLoading] = useState(false);

  const axiosInstance = useAxiosInstance();

  async function handleSubmit(data) {
    const formData = new FormData();

    formData.append("email", data.email);

    try {
      setIsLoading(true);
      const response = await axiosInstance.post(
        `${MANAGE_EMPLOYEE_API}inviteEmployee`,
        formData
      );

      if (response.status === 201) {
        toggleFetch();
        setCreateModal(false);
        toast({
          variant: "success",
          title: "Success",
          description: "Invite Employee  Successfully",
        });
      } else {
        toast({
          variant: "destructive",
          title: "error",
          description: "Failed To Invite Employee Successfully",
        });
      }
    } catch (error) {
      toast({
        variant: "destructive",
        title: "error",
        description: "Failed To Invite Employee Successfully",
      });
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <FormWrapper onSubmit={handleSubmit} {...props}>
      <div className="grid gap-2">
        <EmailInput
          name="email"
          label="Email"
          placeholder="Enter Employee Email"
          rules={{ required: "Email is required" }}
          className="space-y-1"
        />
        <Button className="w-full mt-2" loading={isLoading}>
          {isLoading ? (
            <Loader2 className="w-4 h-4 mr-2 animate-spin" />
          ) : (
            "Invite Employee"
          )}
        </Button>
      </div>
    </FormWrapper>
  );
}
