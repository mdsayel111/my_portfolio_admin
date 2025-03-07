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
import CustomModal from "../../../Components/Partials/CustomModal/CustomModal";
import { useAxiosInstance } from "../../../Hooks/Instances/useAxiosInstance";
import {
  ARCHIVE_EXAM_API,
  MANAGE_EXAM_API,
  UNARCHIVE_EXAM_API,
} from "../../../Utilities/APIs/APIs";
import DownloadCsv from "./components/DownloadCsv";
import UpdateExam from "./UpdateExam/UpdateExam";
import ViewExam from "./ViewExam";
// import UpdateExam from "./UpdateExam";

// import ViewExam from "./ViewExam";

function Exams() {
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
    viewModal,
    setViewModal,
    data,
    setData,
    target,
    toggleFilterValue,
    setToggleFilter,
    paginationState,
    setPaginationState,
    toggleFetch,
    setTarget,
    setArchiveModal,
    archiveModal,
    setTotalPages,
    setTotalData,
  } = useEntityState();

  useEffect(() => {
    async function fetchData() {
      const { data: exams, status } = await axiosInstance.get(
        `${MANAGE_EXAM_API}?filter=${filter}`,
        {
          params: {
            page: paginationState.currentPage,
            limit: paginationState.limit,
          },
        }
      );
      if (status === 200) {
        setData(exams?.exams);
        setTotalPages(exams?.totalPages);
        setTotalData(exams?.totalItems);
      } else {
        console.error("Failed to fetch Exams:");
      }
    }
    fetchData();
  }, [toggle, filter, paginationState.currentPage, paginationState.limit]);

  const headers = [
    { label: "Venue" },
    { label: "Email" },
    { label: "Number" },
    { label: "Charges" },
  ];

  return (
    <CardLayout>
      <Header
        heading="Exams"
        openModal={setCreateModal}
        modalLabel="Export Data"
        searchPlaceholder="Search Exam"
        hasModal={true}
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
            ? data.map((exam) => (
                <CLTableRow key={exam._id}>
                  <CLTableCell text={exam?.venue?.name} />
                  <CLTableCell text={exam?.applicant?.emailAddress} />
                  <CLTableCell
                    text={
                      exam?.applicant?.mobileNumber ||
                      exam?.applicant?.homeTelephone
                    }
                  />
                  <CLTableCell text={exam?.totalCost} />

                  <CLTableActionButtons
                    isActive={exam?.isActive}
                    target={exam}
                    hasEdit={exam.isActive}
                    editBtnProps={{ setEditModal, setTarget }}
                    archiveBtnProps={{ setArchiveModal, setTarget }}
                    hasView={true}
                    viewBtnProps={{ setViewModal, setTarget }}
                  />
                </CLTableRow>
              ))
            : null}
        </CLTableBody>
      </CLTable>
      <CLTableFooter
        dataLabel="Exams"
        hasPagination={true}
        paginationState={paginationState}
        setPaginationState={setPaginationState}
        paginationDispatch={setPaginationState}
      />

      <Modal
        contentClassName={"!max-w-2xl"}
        isOpen={editModal}
        onClose={setEditModal}
        title={"Update Exam"}
      >
        <UpdateExam
          toggle={toggle}
          setEditModal={setEditModal}
          id={target?._id}
          toggleFetch={toggleFetch}
        />
      </Modal>
      {viewModal && (
        <CustomModal>
          <ViewExam target={target} setViewModal={setViewModal} />
        </CustomModal>
      )}
      {archiveModal && (
        <ArchiveModal
          isOpen={archiveModal}
          onClose={() => setArchiveModal(false)}
          item={{
            ...target,
            name: target?._id,
          }}
          toggleFetch={toggleFetch}
          api={`${target.isActive ? ARCHIVE_EXAM_API : UNARCHIVE_EXAM_API}${
            target?._id
          }`}
          axiosInstance={axiosInstance}
          successMessage={`${target?.name} has been archived`}
          isArchive={target?.isActive}
          title={target?._id}
        />
      )}

      {createModal && (
        <Modal isOpen={createModal} onClose={setCreateModal}>
          <DownloadCsv setCreateModal={setCreateModal} />
        </Modal>
      )}
    </CardLayout>
  );
}

export default Exams;
