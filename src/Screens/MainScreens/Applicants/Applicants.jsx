import {
  CLTable,
  CLTableBody,
  CLTableHeader,
  Header,
  CLTableFooter,
  Modal,
  CLTableRow,
  CLTableCell,
  CLTableActionButtons,
  ArchiveModal,
} from "@antopolis/admin-component-library/dist/elements";
import { CardLayout } from "@antopolis/admin-component-library/dist/layout";
import { useEntityState } from "@antopolis/admin-component-library/dist/hooks";
import { useEffect } from "react";
import {
  ARCHIVE_APPLICANT_API,
  MANAGE_APPLICANT_API,
  UNARCHIVE_APPLICANT_API,
} from "../../../Utilities/APIs/APIs";
import { useAxiosInstance } from "../../../Hooks/Instances/useAxiosInstance";
import UpdateApplicant from "./UpdateApplicant";
import CustomModal from "../../../Components/Partials/CustomModal/CustomModal";
import ViewApplicationModal from "./ViewApplication Modal";
// import ViewApplicant from "./ViewApplicant";

function Applicants() {
  const axiosInstance = useAxiosInstance();
  const {
    setFilter,
    setEditModal,
    editModal,
    viewModal,
    setViewModal,
    filter,
    toggle,
    toggleFilter,
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
      const { data, status } = await axiosInstance.get(
        `${MANAGE_APPLICANT_API}?filter=${filter}`,
        {
          params: {
            page: paginationState.currentPage,
            limit: paginationState.limit,
          },
        }
      );
      if (status === 200) {
        setData(data?.applicants);
        setTotalPages(data?.totalPages);
        setTotalData(data?.totalItems);
      } else {
        console.error("Failed to fetch applicants:");
      }
    }
    fetchData();
  }, [toggle, filter, paginationState.currentPage, paginationState.limit]);

  const headers = [
    { label: "Name" },
    { label: "Mobile No." },
    { label: "Email" },
  ];

  return (
    <CardLayout>
      <Header
        heading="Applicants"
        hasModal={false}
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
            ? data.map((applicant) => (
                <CLTableRow key={applicant?._id}>
                  <CLTableCell
                    text={
                      applicant?.firstName +
                      " " +
                      applicant.middleName +
                      " " +
                      applicant?.lastName
                    }
                  />
                  <CLTableCell text={applicant?.mobileNumber} />
                  <CLTableCell text={applicant?.emailAddress} />
                  <CLTableActionButtons
                    hasView={true}
                    viewBtnProps={{ setViewModal, setTarget }}
                    isActive={applicant?.isActive}
                    target={applicant}
                    hasEdit={applicant.isActive}
                    editBtnProps={{ setEditModal, setTarget }}
                    archiveBtnProps={{ setArchiveModal, setTarget }}
                  />
                </CLTableRow>
              ))
            : null}
        </CLTableBody>
      </CLTable>
      <CLTableFooter
        dataLabel="Applicants"
        hasPagination={true}
        paginationState={paginationState}
        setPaginationState={setPaginationState}
        paginationDispatch={setPaginationState}
      />

      {viewModal && (
        <CustomModal>
          <ViewApplicationModal target={target} setViewModal={setViewModal} />
        </CustomModal>
      )}

      <Modal
        isOpen={editModal}
        onClose={setEditModal}
        title={"Update Applicant"}
      >
        <UpdateApplicant
          setEditModal={setEditModal}
          id={target?._id}
          toggleFetch={toggleFetch}
        />
      </Modal>
      {archiveModal && (
        <ArchiveModal
          isOpen={archiveModal}
          onClose={() => setArchiveModal(false)}
          item={{
            ...target,
            name:
              target?.firstName +
              " " +
              target?.middleName +
              " " +
              target?.lastName,
          }}
          toggleFetch={toggleFetch}
          api={`${
            target.isActive ? ARCHIVE_APPLICANT_API : UNARCHIVE_APPLICANT_API
          }${target?._id}`}
          axiosInstance={axiosInstance}
          successMessage={`${
            target?.firstName +
            " " +
            target?.middleName +
            " " +
            target?.lastName
          } has been archived`}
          isArchive={target?.isActive}
          title={
            target?.firstName +
            " " +
            target?.middleName +
            " " +
            target?.lastName
          }
        />
      )}
    </CardLayout>
  );
}

export default Applicants;
