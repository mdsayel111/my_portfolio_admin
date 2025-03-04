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
  ARCHIVE_SUBJECT_BOARD_API,
  MANAGE_SUBJECT_BOARD_API,
  UNARCHIVE_SUBJECT_BOARD_API,
} from "../../../Utilities/APIs/APIs";
import { useAxiosInstance } from "../../../Hooks/Instances/useAxiosInstance";

import CreateSubjectBoardMap from "./CreateSubjectBoardMap";
import UpdateSubjectBoardMap from "./UpdateSubjectBoardMap";

function SubjectBoardMaps() {
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
  } = useEntityState();

  useEffect(() => {
    async function fetchData() {
      const { data: subjectBoardData, status } = await axiosInstance.get(
        `${MANAGE_SUBJECT_BOARD_API}?filter=${filter}`
        // {
        //   params: {
        //     page: paginationState.currentPage,
        //     limit: paginationState.limit,
        //   },
        // }
      );
      if (status === 200) {
        setData(subjectBoardData);
        // setTotalPages(subjectBoardData?.totalPages);
        // setTotalData(subjectBoardData?.totalItems);
      } else {
        console.error("Failed to fetch SubjectBoardMaps:");
      }
    }
    fetchData();
  }, [toggle, filter]);

  const headers = [{ label: "Subject Name" }, { label: "Board Name" }];

  return (
    <CardLayout>
      <Header
        heading="Connected Subject-Boards"
        openModal={setCreateModal}
        modalLabel="Create New Connection"
        searchPlaceholder="Search Connection"
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
            ? data.map((subjectBoard) => (
                <CLTableRow key={subjectBoard._id}>
                  <CLTableCell text={subjectBoard?.subject?.name} />
                  <CLTableCell text={subjectBoard?.board?.name} />
                  <CLTableActionButtons
                    isActive={subjectBoard?.isActive}
                    target={subjectBoard}
                    hasView={false}
                    hasEdit={subjectBoard.isActive}
                    editBtnProps={{ setEditModal, setTarget }}
                    archiveBtnProps={{ setArchiveModal, setTarget }}
                  />
                </CLTableRow>
              ))
            : null}
        </CLTableBody>
      </CLTable>
      <CLTableFooter
        dataLabel="Subject Board Connections"
        hasPagination={true}
        paginationState={paginationState}
        paginationDispatch={setPaginationState}
      />

      <Modal
        isOpen={createModal}
        onClose={setCreateModal}
        title={"Create New Connection"}
      >
        <CreateSubjectBoardMap
          setCreateModal={setCreateModal}
          toggleFetch={toggleFetch}
        />
      </Modal>

      <Modal
        isOpen={editModal}
        onClose={setEditModal}
        title={"Update Connection"}
      >
        <UpdateSubjectBoardMap
          setEditModal={setEditModal}
          id={target?._id}
          toggleFetch={toggleFetch}
        />
      </Modal>
      {/* <Modal isOpen={viewModal} onClose={setViewModal} title={"View Subject"}>
          <ViewSubject />
        </Modal> */}
      {archiveModal && (
        <ArchiveModal
          isOpen={archiveModal}
          onClose={() => setArchiveModal(false)}
          item={{
            ...target,
            name: target?.subject?.name + " - " + target?.board?.name,
          }}
          toggleFetch={toggleFetch}
          api={`${
            target.isActive
              ? ARCHIVE_SUBJECT_BOARD_API
              : UNARCHIVE_SUBJECT_BOARD_API
          }${target?._id}`}
          axiosInstance={axiosInstance}
          successMessage={`${
            target?.subject?.name + " - " + target?.board?.name
          } has been archived`}
          isArchive={target?.isActive}
          title={target?.subject?.name + " - " + target?.board?.name}
        />
      )}
    </CardLayout>
  );
}

export default SubjectBoardMaps;
