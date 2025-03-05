import {
  ArchiveModal,
  CLTable,
  CLTableActionButtons,
  CLTableBody,
  CLTableCell,
  CLTableFooter,
  CLTableHeader,
  CLTableImageCell,
  CLTableRow,
  Header,
  Modal,
} from "@antopolis/admin-component-library/dist/elements";
import { useEntityState } from "@antopolis/admin-component-library/dist/hooks";
import { CardLayout } from "@antopolis/admin-component-library/dist/layout";
import { useEffect } from "react";
import CustomModal from "../../../Components/Partials/CustomModal/CustomModal";
import { useAxiosInstance } from "../../../Hooks/Instances/useAxiosInstance";
import { MANAGE_Project_API } from "../../../Utilities/APIs/APIs";
import UpdateProject from "./UpdateProject";
import ViewProject from "./ViewProject";

function Projects() {
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
      const { data:projectsData, status } = await axiosInstance.get(
        `${MANAGE_Project_API}`,
        {
          params: {
            page: paginationState.currentPage,
            limit: paginationState.limit,
          },
        }
      );
      if (status === 200) {
        setData(projectsData?.data);
        setTotalPages(data?.totalPages);
        setTotalData(data?.totalItems);
      } else {
        console.error("Failed to fetch projects:");
      }
    }
    fetchData();
  }, [toggle, filter, paginationState.currentPage, paginationState.limit]);

  console.log(data)

  const headers = [
    { label: "Name" },
    { label: "Description" },
  ];

  return (
    <CardLayout>
      <Header
        heading="Projects"
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
            ? data.map((project) => (
                <CLTableRow key={project?._id}>
                  <CLTableImageCell
                    url={project?.imgLink}
                    altText={'...'}
                  />
                  <CLTableCell text={project?.description?.slice(0,100)} />
                  <CLTableActionButtons
                    hasView={true}
                    viewBtnProps={{ setViewModal, setTarget }}
                    isActive={project?.isActive}
                    target={project}
                    hasEdit={project.isActive}
                    editBtnProps={{ setEditModal, setTarget }}
                    archiveBtnProps={{ setArchiveModal, setTarget }}
                  />
                </CLTableRow>
              ))
            : null}
        </CLTableBody>
      </CLTable>
      <CLTableFooter
        dataLabel="Projects"
        hasPagination={true}
        paginationState={paginationState}
        setPaginationState={setPaginationState}
        paginationDispatch={setPaginationState}
      />

      {viewModal && (
        <CustomModal>
          <ViewProject target={target} setViewModal={setViewModal} />
        </CustomModal>
      )}

      <Modal
        isOpen={editModal}
        onClose={setEditModal}
        title={"Update Project"}
      >
        <UpdateProject
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
            target.isActive ? ARCHIVE_PROJECT_API : UNARCHIVE_PROJECT_API
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

export default Projects;
