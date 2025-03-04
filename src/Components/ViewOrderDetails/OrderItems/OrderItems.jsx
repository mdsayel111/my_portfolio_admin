import {
  CLTable,
  CLTableActionButtons,
  CLTableBody,
  CLTableCell,
  CLTableHeader,
  CLTableRow,
} from "@antopolis/admin-component-library/dist/elements";
import {
  toast,
  useEntityState,
} from "@antopolis/admin-component-library/dist/hooks";
import { CardLayout } from "@antopolis/admin-component-library/dist/layout";
import { useAxiosInstance } from "../../../Hooks/Instances/useAxiosInstance";
import { ORDERS_API } from "../../../Utilities/APIs/APIs";
import { MdDelete } from "react-icons/md";

export default function OrderItems({ orderItems, priceSummary }) {
  const { data, setData, toggleFetch } = useEntityState();
  const axiosInstance = useAxiosInstance();
  const headers = [
    { label: "Item", className: "min-w-60" },
    { label: "Quantity", className: "min-w-28 " },
    { label: "Unit Price", className: "min-w-28" },
    { label: "Total", className: "min-w-28" },
  ];

  return (
    <div>
      <CardLayout className={"mt-4"}>
        <CLTable containerClassName="" tableClassName="">
          <CLTableHeader headers={headers} hasActions={true} />
          <CLTableBody className={""}>
            {orderItems?.length > 0 &&
              orderItems.map((item, index) => (
                <CLTableRow key={index} className="animate-slide-in">
                  <CLTableCell className="" text={item?.itemName} />
                  <CLTableCell className="" text={item?.quantity} />
                  <CLTableCell className="" text={item?.unitPrice.toFixed(2)} />
                  <CLTableCell className="" text={item?.total.toFixed(2)} />

                  <CLTableActionButtons
                    isActive={item.isActive || true}
                    target={item}
                    hasView={false}
                    hasEdit={false}
                    hasArchive={false}
                    extraAction
                    extraActions={[
                      {
                        onClick: async () => {
                          const response = await axiosInstance.delete(
                            `${ORDERS_API}deleteSingleItemFromOrder/${item?._id}`
                          );
                          toggleFetch();
                          if (response.status === 200) {
                            toast({
                              variant: "success",
                              title: "Success",
                              description: `Item deleted`,
                            });
                          }
                        },
                        btnProps: {
                          icon: MdDelete,
                          tooltipText: "Delete Item",
                          toolTipContainerClassName:
                            "!text-slate-600  hover:!bg-slate-600 hover:!text-white ",
                          toolTipClassName: "hover:!text-white ",
                        },
                      },
                    ]}
                  />
                </CLTableRow>
              ))}
          </CLTableBody>
        </CLTable>
      </CardLayout>
      <div className="text-white rounded-lg shadow-lg p-6 mt-0 animate-fade-in">
        <div className="flex justify-between py-3  animate-slide-in">
          <h6 className="font-semibold">Total</h6>
          <h6 className="font-semibold">
            {priceSummary?.total.toFixed(2) || 0}
          </h6>
        </div>
        <div className="flex justify-between py-3  animate-slide-in">
          <h6 className="font-semibold">Delivery Fee</h6>
          <h6 className="font-semibold">{priceSummary?.deliveryFee || 0}</h6>
        </div>
        <div className="flex justify-between py-3  animate-slide-in">
          <h6 className="font-semibold">Sub Total</h6>
          <h6 className="font-semibold">
            {priceSummary?.subtotal.toFixed(2) || 0}
          </h6>
        </div>
        <div className="flex justify-between py-3  animate-slide-in">
          <h6 className="font-semibold">VAT</h6>
          <h6 className="font-semibold">{priceSummary?.vat || 0}</h6>
        </div>
        <div className="flex justify-between py-3 border-b border-gray-700 animate-slide-in">
          <h6 className="font-semibold">Discount</h6>
          <h6 className="font-semibold">{priceSummary?.discount || 0}</h6>
        </div>
        <div className="flex justify-between py-3 animate-slide-in">
          <h6 className="font-semibold">Grand Total</h6>
          <h6 className="font-semibold">
            {priceSummary?.grandTotal.toFixed(2) || 0}
          </h6>
        </div>
      </div>
    </div>
  );
}
