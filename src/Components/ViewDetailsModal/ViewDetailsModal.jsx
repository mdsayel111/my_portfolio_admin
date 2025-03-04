import { Modal } from "@antopolis/admin-component-library/dist/elements";
import { toast } from "@antopolis/admin-component-library/dist/hooks";
import ViewDetails from "./Components/ViewDetails";
import { getFieldsWithValue } from "../../Utilities/Fields/getFieldsWithValue";
import { useEffect, useState } from "react";
export function ViewDetailsModal({
  isOpen,
  onClose,
  api,
  axiosInstance,
  title,
  item,
  toggleFetch,
}) {
  const [viewDetailsData, setViewDetailsData] = useState(null);

  useEffect(() => {
    async function fetchData() {
      const { data: viewDetailsData, status } = await axiosInstance.get(api);
      if (status === 200) {
        setViewDetailsData(viewDetailsData);
      } else {
        toast({
          variant: "destructive",
          title: "Error",
          description: "Failed to fetch data",
        });
      }
    }
    fetchData();
  }, [api, axiosInstance]);

  console.log("viewDetailsData --------------->", viewDetailsData);

  // view modal fields with values
  const fieldsWithValues = getFieldsWithValue(item, viewDetailsData);

  const handleClose = () => {
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={handleClose} title={title}>
      <ViewDetails fieldsWithValues={fieldsWithValues} />
    </Modal>
  );
}
