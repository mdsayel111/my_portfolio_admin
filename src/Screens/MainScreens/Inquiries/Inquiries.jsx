import {
  CLTable,
  CLTableActionButtons,
  CLTableBody,
  CLTableCell,
  CLTableFooter,
  CLTableHeader,
  CLTableRow,
  Header,
  Modal
} from "@antopolis/admin-component-library/dist/elements";
import { useEntityState } from "@antopolis/admin-component-library/dist/hooks";
import { CardLayout } from "@antopolis/admin-component-library/dist/layout";
import { useEffect } from "react";
import { useAxiosInstance } from "../../../Hooks/Instances/useAxiosInstance";
import { MANAGE_INQUIRY_API } from "../../../Utilities/APIs/APIs";
import UpdateInquiry from "./UpdateInquiry";

// import ViewVenue from "./ViewVenue";

function Inquiries() {
  const axiosInstance = useAxiosInstance();
  const {
    setEditModal,
    editModal,
    filter,
    toggle,
    setTarget,
    data,
    setData,
    target,
    paginationState,
    setPaginationState,
    toggleFetch,
    setTotalPages,
    setTotalData,
  } = useEntityState();

  useEffect(() => {
    async function fetchData() {
      const { data, status } = await axiosInstance.get(
        `${MANAGE_INQUIRY_API}?filter=${filter}`,
        {
          params: {
            page: paginationState.currentPage,
            limit: paginationState.limit,
          },
        }
      );
      if (status === 200) {
        setData(data?.inquiries);
        setTotalPages(data?.totalPages);
        setTotalData(data?.totalItems);
      } else {
        console.error("Failed to fetch Subjects:");
      }
    }
    fetchData();
  }, [toggle, filter]);

  const headers = [
    { label: "Name" },
    { label: "Message" },
    { label: "Telephone" },
    { label: "Email" },
    { label: "Status" },
  ];

  return (
    <CardLayout>
      <Header heading="Inquiries" hasModal={false} />

      <CLTable>
        <CLTableHeader headers={headers} hasActions={true} />
        <CLTableBody>
          {data?.length > 0
            ? data.map((inquiry) => (
                <CLTableRow key={inquiry._id}>
                  <CLTableCell text={inquiry?.name} />
                  <CLTableCell text={inquiry?.message} />
                  <CLTableCell text={inquiry?.telephone} />
                  <CLTableCell text={inquiry?.email} />
                  <CLTableCell text={inquiry?.status} />

                  <CLTableActionButtons
                    // isActive={inquiry?.isActive}
                    target={inquiry}
                    hasView={false}
                    hasArchive={false}
                    hasEdit={inquiry.isActive}
                    editBtnProps={{ setEditModal, setTarget }}
                  />
                </CLTableRow>
              ))
            : null}
        </CLTableBody>
      </CLTable>
      <CLTableFooter
        dataLabel="Inquiries"
        hasPagination={true}
        paginationState={paginationState}
        setPaginationState={setPaginationState}
        paginationDispatch={setPaginationState}
      />

      <Modal isOpen={editModal} onClose={setEditModal} title={"Update Inquiry"}>
        <UpdateInquiry
          setEditModal={setEditModal}
          id={target?._id}
          toggleFetch={toggleFetch}
        />
      </Modal>
    </CardLayout>
  );
}

export default Inquiries;
