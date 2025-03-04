import { IMAGE_URL } from "../APIs/APIs";

export const getFieldsWithValue = (item, viewDetailsData) => {
  switch (item) {
    case "user":
      return [
        {
          label: "Image",
          type: "image",
          IMAGE_URL: IMAGE_URL,
          value: viewDetailsData?.dp,
        },
        { label: "Name", value: viewDetailsData?.name },
        { label: "Email", value: viewDetailsData?.email },
        { label: "Phone", value: viewDetailsData?.mobile },
      ];
    case "employee":
      return [
        {
          label: "Image",
          type: "image",
          IMAGE_URL: IMAGE_URL,
          value: viewDetailsData?.dp,
        },
        { label: "Name", value: viewDetailsData?.name },
        { label: "Email", value: viewDetailsData?.email },
        { label: "Level", value: viewDetailsData?.level },
      ];
    case "manager":
      return [
        {
          label: "Image",
          type: "image",
          IMAGE_URL: IMAGE_URL,
          value: viewDetailsData?.dp,
        },
        { label: "Name", value: viewDetailsData?.name },
        { label: "Email", value: viewDetailsData?.email },
        { label: "Level", value: viewDetailsData?.level },
      ];
    case "menu category":
      return [
        { label: "Name", value: viewDetailsData?.name },
        { label: "Precedence", value: viewDetailsData?.precedence },
        { label: "Description", value: viewDetailsData?.description },
      ];
    case "featured item":
      return [
        {
          label: "Image",
          type: "image",
          IMAGE_URL: IMAGE_URL,
          value: viewDetailsData?.branchItem?.item?.image,
        },
        { label: "Name", value: viewDetailsData?.branchItem?.item?.name },
        {
          label: "Category",
          value: viewDetailsData?.branchItem?.category?.name,
        },
        {
          label: "Description",
          value: viewDetailsData?.branchItem?.item?.description,
        },
        { label: "Branch", value: viewDetailsData?.branchItem?.branch?.name },
      ];
    case "item":
      return [
        {
          label: "Image",
          type: "image",
          IMAGE_URL: IMAGE_URL,
          value: viewDetailsData?.image,
        },
        { label: "Name", value: viewDetailsData?.name },
        { label: "Price", value: viewDetailsData?.price },
        { label: "isCombo", value: viewDetailsData?.isCombo ? "Yes" : "No" },
        { label: "Description", value: viewDetailsData?.description },
      ];
    case "branch":
      return [
        {
          label: "Image",
          type: "image",
          IMAGE_URL: IMAGE_URL,
          value: viewDetailsData?.branch?.logo,
        },
        { label: "Name", value: viewDetailsData?.branch?.name },
        { label: "Cuisine", value: viewDetailsData?.branch?.cuisine },
        { label: "Description", value: viewDetailsData?.branch?.description },
      ];
    case "branch category":
      return [
        { label: "Name", value: viewDetailsData?.category?.name },
        { label: "Precedence", value: viewDetailsData?.category?.precedence },
      ];
    case "hero slider":
      return [
        {
          label: "Image",
          type: "image",
          IMAGE_URL: IMAGE_URL,
          value: viewDetailsData?.image,
        },
        { label: "Precedence", value: viewDetailsData?.precedence },
        { label: " Link", value: viewDetailsData?.link },
      ];
    default:
      return [];
  }
};
