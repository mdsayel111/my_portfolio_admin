import {
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
import { useAxiosInstance } from "../../../../Hooks/Instances/useAxiosInstance";
import { GET_IN_TOUCH_API } from "../../../../Utilities/APIs/APIs";
import CreateTouch from "./components/CreateTouch";
import UpdateTouch from "./components/UpdateTouch";

// import CreateContactUs from "./components/CreateContactUs";
// import ViewContact from "./components/viewContact";

function GetinTouch() {
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
        `${GET_IN_TOUCH_API}?filter=${filter}`,
        {
          params: {
            page: paginationState.currentPage,
            limit: paginationState.limit,
          },
        }
      );
      if (status === 200) {
        setData(contactUsData?.getInTouch);
        setTotalPages(contactUsData?.totalPages);
        setTotalData(contactUsData?.totalItems);
      } else {
        console.error("Failed to fetch :");
      }
    }
    fetchData();
  }, [toggle, filter]);

  const headers = [
    { label: "Address", className: "min-w-24" },
    { label: "Name", className: "min-w-36 " },
  ];

  return (
    <CardLayout>
      <Header
        heading="Get In Touch   "
        openModal={setCreateModal}
        modalLabel="Create New Get In Touch"
        searchPlaceholder="Search Get In Touch"
        filterAndSearchProps={{
          filter,
          setFilter,
          hasModal: false,
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
            ? data.map((getInTouch) => (
                <CLTableRow key={getInTouch?._id}>
                  <CLTableCell text={getInTouch?.address} />
                  <CLTableCell text={getInTouch?.name} />

                  <CLTableActionButtons
                    isActive={getInTouch?.isActive}
                    target={getInTouch}
                    hasView={true}
                    hasEdit={getInTouch.isActive}
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
        dataLabel="Get In Touch"
        hasPagination={true}
        paginationState={paginationState}
        paginationDispatch={setPaginationState}
      />
      <Modal
        isOpen={createModal}
        onClose={setCreateModal}
        title={"Create Get In Touch"}
      >
        <CreateTouch
          setCreateModal={setCreateModal}
          createModal={createModal}
        />
      </Modal>

      <Modal
        isOpen={editModal}
        onClose={setEditModal}
        title={"Update Get In Touch"}
      >
        <UpdateTouch
          setEditModal={setEditModal}
          editModal={editModal}
          toggleFetch={toggleFetch}
          id={target?._id}
        />
      </Modal>

      {viewModal && (
        <Modal
          isOpen={viewModal}
          onClose={setViewModal}
          title={"View Get In Touch"}
        >
          {/* <ViewContact target={target} setViewModal={setViewModal} /> */}
        </Modal>
      )}
    </CardLayout>
  );
}

export default GetinTouch;
