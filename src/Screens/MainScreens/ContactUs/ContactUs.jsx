import {
  ArchiveModal,
  CLTable,
  CLTableActionButtons,
  CLTableBody,
  CLTableCell,
  CLTableFooter,
  CLTableHeader,
  CLTableRow,
  Header,
  Modal,
} from "@antopolis/admin-component-library/dist/elements";
import { useEntityState } from "@antopolis/admin-component-library/dist/hooks";
import { CardLayout } from "@antopolis/admin-component-library/dist/layout";
import { useEffect } from "react";
import { useAxiosInstance } from "../../../Hooks/Instances/useAxiosInstance";
import {
  ARCHIVE_CONTACT_US_API,
  MANAGE_CONTACT_US_API,
  UNARCHIVE_CONTACT_US_API
} from "../../../Utilities/APIs/APIs";
import CreateContactUs from "./components/CreateContactUs";
import UpdateContactUs from "./components/updateContactUs";
import ViewContact from "./components/viewContact";

function ContactUs() {
  const axiosInstance = useAxiosInstance();
  const {
    setFilter,
    setEditModal,
    editModal,
    createModal,
    setCreateModal,
    filter,
    toggle,
    toggleFilter,
    data,
    viewModal,
    setViewModal,
    setData,
    target,
    toggleFilterValue,
    setToggleFilter,
    paginationState,
    setPaginationState,
    setTotalPages,
    setTotalData,
    toggleFetch,
    setTarget,
    setArchiveModal,
    archiveModal,
  } = useEntityState();

  useEffect(() => {
    async function fetchData() {
      const { data: contactUsData, status } = await axiosInstance.get(
        `${MANAGE_CONTACT_US_API}?filter=${filter}`,
        {
          params: {
            page: paginationState.currentPage,
            limit: paginationState.limit,
          },
        }
      );
      if (status === 200) {
        setData(contactUsData?.contactUs);
        setTotalPages(contactUsData?.totalPages);
        setTotalData(contactUsData?.totalItems);
      } else {
        console.error("Failed to fetch boards:");
      }
    }
    fetchData();
  }, [toggle, filter]);

  const headers = [
    { label: "Address", className: "min-w-24" },
    { label: "Phone", className: "min-w-36 max-lg:hidden" },
  ];

  return (
    <CardLayout>
      <Header
        heading="Contact Us"
        openModal={setCreateModal}
        modalLabel="Create New Contact Us"
        searchPlaceholder="Search Contact Us"
        filterAndSearchProps={{
          filter,
          setFilter,
          hasSearch: false,
          hasFilter: true,
          toggleFilterValue,
          toggleFilter,
          setToggleFilter,
        }}
      />

      <CLTable>
        <CLTableHeader headers={headers} hasActions={true} />
        <CLTableBody>
          {data?.length > 0
            ? data.map((contactUs) => (
                <CLTableRow key={contactUs?._id}>
                  <CLTableCell text={contactUs?.address} />
                  <CLTableCell
                    className="max-lg:hidden"
                    text={contactUs?.phone}
                  />

                  <CLTableActionButtons
                    isActive={contactUs?.isActive}
                    target={contactUs}
                    hasView={true}
                    hasEdit={contactUs.isActive}
                    editBtnProps={{ setEditModal, setTarget }}
                    archiveBtnProps={{ setArchiveModal, setTarget }}
                    viewBtnProps={{ setViewModal, setTarget }}
                  />
                </CLTableRow>
              ))
            : null}
        </CLTableBody>
      </CLTable>
      <CLTableFooter
        dataLabel="Boards"
        hasPagination={true}
        paginationState={paginationState}
        paginationDispatch={setPaginationState}
      />

      <Modal
        isOpen={createModal}
        onClose={setCreateModal}
        title={"Create New Board"}
      >
        <CreateContactUs
          setCreateModal={setCreateModal}
          toggleFetch={toggleFetch}
        />
      </Modal>

      <Modal
        isOpen={editModal}
        onClose={setEditModal}
        title={"Update Contact Us"}
      >
        <UpdateContactUs
          setEditModal={setEditModal}
          id={target?._id}
          toggleFetch={toggleFetch}
        />
      </Modal>
      {viewModal && (
        <Modal isOpen={viewModal} onClose={setViewModal} title={"View Contact"}>
          <ViewContact target={target} setViewModal={setViewModal} />
        </Modal>
      )}
      {archiveModal && (
        <ArchiveModal
          isOpen={archiveModal}
          onClose={() => setArchiveModal(false)}
          item={target}
          toggleFetch={toggleFetch}
          api={`${
            target.isActive ? ARCHIVE_CONTACT_US_API : UNARCHIVE_CONTACT_US_API
          }${target?._id}`}
          axiosInstance={axiosInstance}
          successMessage={`Item has been archived`}
          isArchive={target?.isActive}
          title={target?.address}
        />
      )}
    </CardLayout>
  );
}

export default ContactUs;
