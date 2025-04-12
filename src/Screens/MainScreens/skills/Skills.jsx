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
  CLTableImageCell,
} from "@antopolis/admin-component-library/dist/elements";
import { CardLayout } from "@antopolis/admin-component-library/dist/layout";
import { useEntityState } from "@antopolis/admin-component-library/dist/hooks";
import { useEffect } from "react";
import {
  MANAGE_SKILL_API,
} from "../../../Utilities/APIs/APIs";
import { useAxiosInstance } from "../../../Hooks/Instances/useAxiosInstance";
import UpdateSkill from "./UpdateSkill";
import CreateSkill from "./CreateSkill";
import CustomHeader from "../../../Components/Partials/CustomHeader/CustomHeader";

// import ViewSkill from "./ViewSkill";

function Skills() {
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
        `${MANAGE_SKILL_API}?filter=${filter}`,
        {
          params: {
            page: paginationState.currentPage,
            limit: paginationState.limit,
          },
        }
      );
      if (status === 200) {
        setData(data?.data);
        setTotalPages(data?.totalPages);
        setTotalData(data?.totalItems);
      } else {
        console.error("Failed to fetch Subjects:");
      }
    }
    fetchData();
  }, [toggle, filter, paginationState.currentPage, paginationState.limit]);

  const headers = [{ label: "Image" },
  // { label: "Name" },  
  { label: "Title" }];

  return (
    <CardLayout>
      <CustomHeader title={"Experiences"} btnName={"Experience"} createModal={createModal} setCreateModal={setCreateModal} hasCreate={true} />

      <CLTable>
        <CLTableHeader headers={headers} hasActions={true} />
        <CLTableBody>

          {
            data?.map((skill) => (<CLTableRow key={data._id}>
              <CLTableImageCell
                url={skill?.image}
                altText={'...'}
              />
              <CLTableCell text={skill?.title} />

              <CLTableActionButtons
                isActive={skill?.isActive}
                target={skill}
                hasView={false}
                hasEdit={true}
                editBtnProps={{ setEditModal, setTarget }}
                hasArchive={false}
              // archiveBtnProps={{ setArchiveModal, setTarget }}
              />
            </CLTableRow>))
          }

        </CLTableBody>
      </CLTable>
      <CLTableFooter
        dataLabel="Skill"
        hasPagination={true}
        paginationState={paginationState}
        setPaginationState={setPaginationState}
        paginationDispatch={setPaginationState}
      />

      <Modal
        isOpen={createModal}
        onClose={setCreateModal}
        title={"Create New Skill"}
      >
        <CreateSkill
          setCreateModal={setCreateModal}
          toggleFetch={toggleFetch}
        />
      </Modal>

      <Modal isOpen={editModal} onClose={setEditModal} title={"Update Skill"}>
        <UpdateSkill
          setEditModal={setEditModal}
          id={target?._id}
          toggleFetch={toggleFetch}
        />
      </Modal>
      {/* <Modal isOpen={viewModal} onClose={setViewModal} title={"View Skill"}>
          <ViewSkill />
        </Modal> */}
      {archiveModal && (
        <ArchiveModal
          isOpen={archiveModal}
          onClose={() => setArchiveModal(false)}
          item={target}
          toggleFetch={toggleFetch}
          api={`${target.isActive ? ARCHIVE_SKILL_API : UNARCHIVE_SKILL_API}${target?._id
            }`}
          axiosInstance={axiosInstance}
          successMessage={`${target?.name} has been archived`}
          isArchive={target?.isActive}
          title={target?.name}
        />
      )}
    </CardLayout>
  );
}

export default Skills;
