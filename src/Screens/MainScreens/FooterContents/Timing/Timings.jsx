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
import { useAxiosInstance } from "../../../../Hooks/Instances/useAxiosInstance";
import {
  ARCHIVE_TIMINGS_API,
  TIMINGS_API,
  UNARCHIVE_TIMINGS_API,
} from "../../../../Utilities/APIs/APIs";
import CreateTiming from "./CreateTiming";
import UpdateTiming from "./UpdateTiming";

// import CreateContactUs from "./components/CreateContactUs";
// import ViewContact from "./components/viewContact";

function Timings() {
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
      const { data: timingData, status } = await axiosInstance.get(
        `${TIMINGS_API}?filter=${filter}`,
        {
          params: {
            page: paginationState.currentPage,
            limit: paginationState.limit,
          },
        }
      );
      if (status === 200) {
        setData(timingData);
      } else {
        console.error("Failed to fetch :");
      }
    }
    fetchData();
  }, [toggle, filter]);

  const headers = [
    { label: "Start Time", className: "min-w-24" },
    { label: "End Time", className: "min-w-24" },
  ];

  return (
    <CardLayout>
      <Header
        heading="Timings"
        openModal={setCreateModal}
        modalLabel="Create New Timing"
        searchPlaceholder="Search Timing"
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
            ? data.map((timing) => (
                <CLTableRow key={timing?._id}>
                  <CLTableCell text={timing?.startTime} />
                  <CLTableCell text={timing?.endTime} />

                  <CLTableActionButtons
                    isActive={timing?.isActive}
                    target={timing}
                    hasView={false}
                    hasEdit={timing.isActive}
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
        title={"Create Timing"}
      >
        <CreateTiming
          setCreateModal={setCreateModal}
          toggleFetch={toggleFetch}
        />
      </Modal>

      <Modal isOpen={editModal} onClose={setEditModal} title={"Update Timing"}>
        <UpdateTiming
          setEditModal={setEditModal}
          toggleFetch={toggleFetch}
          id={target?._id}
        />
      </Modal>

      {archiveModal && (
        <ArchiveModal
          isOpen={archiveModal}
          onClose={() => setArchiveModal(false)}
          item={{
            ...target,
            name: target?._id,
          }}
          toggleFetch={toggleFetch}
          api={`${
            target.isActive ? ARCHIVE_TIMINGS_API : UNARCHIVE_TIMINGS_API
          }${target?._id}`}
          axiosInstance={axiosInstance}
          successMessage={`Item has been archived`}
          isArchive={target?.isActive}
          title={target?.startTime + " - " + target?.endTime}
        />
      )}
    </CardLayout>
  );
}

export default Timings;
