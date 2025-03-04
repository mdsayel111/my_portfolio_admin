import { Modal } from "@antopolis/admin-component-library/dist/elements";
import { toast } from "@antopolis/admin-component-library/dist/hooks";
export function ConformationPopup({
  isOpen,
  onClose,
  item,
  toggleFetch,
  api,
  requestData,
  customDescription,
  successMessage,
  failedMessage,
  isArchive = true,
  axiosInstance,
  title,
  btnText,
  descriptionMesssage,
  titleMessage,
  
}) {

  const handleAction = async () => {
    try {
      const res = requestData
        ? await axiosInstance.patch(api, requestData)
        : await axiosInstance.patch(api);

      if (res.status === 200) {
        toggleFetch();
        toast({
          variant: "success",
          title: "Success",
          description: successMessage,
        });
        onClose();
      } else {
        throw new Error(`Failed to ${failedMessage}`);
      }
    } catch (error) {
      console.error(error);
      toast({
        variant: "destructive",
        title: "Error",
        description: failedMessage,
      });
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={title}
      description={customDescription}
      onConfirm={handleAction}
      confirmText={btnText}
    />
  );
}
