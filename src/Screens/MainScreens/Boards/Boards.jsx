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
import CreateBoard from "./CreateBoard";
import { useEffect } from "react";
import {
  ARCHIVE_BOARD_API,
  MANAGE_BOARD_API,
  UNARCHIVE_BOARD_API,
} from "../../../Utilities/APIs/APIs";
import { useAxiosInstance } from "../../../Hooks/Instances/useAxiosInstance";
import UpdateBoard from "./UpdateBoard";
// import ViewBoard from "./ViewBoard";

function Boards() {
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
      const { data: boardData, status } = await axiosInstance.get(
        `${MANAGE_BOARD_API}?filter=${filter}`
        // {
        //   params: {
        //     page: paginationState.currentPage,
        //     limit: paginationState.limit,
        //   },
        // }
      );
      if (status === 200) {
        setData(boardData);
        // setTotalPages(boardData?.totalPages);
        // setTotalData(boardData?.totalItems);
      } else {
        console.error("Failed to fetch boards:");
      }
    }
    fetchData();
  }, [toggle, filter]);

  const headers = [
    { label: "Name", className: "min-w-24" },
    { label: "Tier", className: "min-w-36 max-lg:hidden" },
  ];

  return (
    <CardLayout>
      <Header
        heading="Boards"
        openModal={setCreateModal}
        modalLabel="Create New Board"
        searchPlaceholder="Search Board"
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
            ? data.map((board) => (
                <CLTableRow>
                  <CLTableCell text={board?.name} />
                  <CLTableCell className="max-lg:hidden" text={board?.tier} />
                  <CLTableActionButtons
                    isActive={board?.isActive}
                    target={board}
                    hasView={false}
                    hasEdit={board.isActive}
                    editBtnProps={{ setEditModal, setTarget }}
                    archiveBtnProps={{ setArchiveModal, setTarget }}
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
        <CreateBoard
          setCreateModal={setCreateModal}
          toggleFetch={toggleFetch}
        />
      </Modal>

      <Modal isOpen={editModal} onClose={setEditModal} title={"Update Board"}>
        <UpdateBoard
          setEditModal={setEditModal}
          id={target?._id}
          toggleFetch={toggleFetch}
        />
      </Modal>
      {/* <Modal isOpen={viewModal} onClose={setViewModal} title={"View Board"}>
        <ViewBoard />
      </Modal> */}
      {archiveModal && (
        <ArchiveModal
          isOpen={archiveModal}
          onClose={() => setArchiveModal(false)}
          item={target}
          toggleFetch={toggleFetch}
          api={`${target.isActive ? ARCHIVE_BOARD_API : UNARCHIVE_BOARD_API}${
            target?._id
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

export default Boards;
