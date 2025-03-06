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
import { useEffect, useState } from "react";
import CustomModal from "../../../Components/Partials/CustomModal/CustomModal";
import { useAxiosInstance } from "../../../Hooks/Instances/useAxiosInstance";
import UpdateProject from "./UpdateProject";
import ViewProject from "./ViewProject";
import CreateProject from "./CreateProject";
import { MANAGE_PROJECT_API } from "../../../Utilities/APIs/APIs";
import CustomHeader from "../../../Components/Partials/CustomHeader/CustomHeader";

function Projects() {
  const axiosInstance = useAxiosInstance();
  const {
    setFilter,
    setEditModal,
    editModal,
    viewModal,
    createModal,
    setCreateModal,
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

  console.log(setCreateModal)

  useEffect(() => {
    async function fetchData() {
      const { data:projectsData, status } = await axiosInstance.get(
        `${MANAGE_PROJECT_API}`,
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
      <CustomHeader title={"Projects"} btnName={"Project"} createModal={createModal} setCreateModal={setCreateModal}/>

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

      <Modal
        isOpen={createModal}
        onClose={setCreateModal}
        title={"Create New Package"}
      >
        <CreateProject
          setCreateModal={setCreateModal}
          toggleFetch={toggleFetch}
        />
      </Modal>
      {console.log(target)}
      {archiveModal && (
        <ArchiveModal
          isOpen={archiveModal}
          onClose={() => setArchiveModal(false)}
          item={target}
          toggleFetch={toggleFetch}
          api={`${MANAGE_PROJECT_API}${target?._id}`}
          axiosInstance={axiosInstance}
          successMessage={`This project has been archived`}
          isArchive={!target?.isDeleted}
          title={
            "Archive this Project"
          }
        />
      )}
    </CardLayout>
  );
}

export default Projects;
