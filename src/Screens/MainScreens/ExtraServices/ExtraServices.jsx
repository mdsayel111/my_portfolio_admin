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
  ARCHIVE_LEVEL_API,
  MANAGE_LEVEL_API,
  UNARCHIVE_LEVEL_API,
} from "../../../Utilities/APIs/APIs";
import { useAxiosInstance } from "../../../Hooks/Instances/useAxiosInstance";
import CreateExtraService from "./CreateExtraService";
import UpdateExtraService from "./UpdateExtraService";

function ExtraServices() {
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
      const { data: levelData, status } = await axiosInstance.get(
        `${MANAGE_LEVEL_API}?filter=${filter}&isMock=true`
        // {
        //   params: {
        //     page: paginationState.currentPage,
        //     limit: paginationState.limit,
        //   },
        // }
      );
      if (status === 200) {
        setData(levelData);
        // setTotalPages(levelData?.totalPages);
        // setTotalData(levelData?.totalItems);
      } else {
        console.error("Failed to fetch extra services:");
      }
    }
    fetchData();
  }, [toggle, filter]);

  const headers = [{ label: "Name", className: "w-full" }];

  return (
    <CardLayout>
      <Header
        heading="Extra services"
        openModal={setCreateModal}
        modalLabel="Create New Extra Service"
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
        dataLabel="extra services"
        hasPagination={true}
        paginationState={paginationState}
        paginationDispatch={setPaginationState}
      />

      <Modal
        isOpen={createModal}
        onClose={setCreateModal}
        title={"Create New Extra Service"}
      >
        <CreateExtraService
          setCreateModal={setCreateModal}
          toggleFetch={toggleFetch}
        />
      </Modal>

      <Modal
        isOpen={editModal}
        onClose={setEditModal}
        title={"Update Extra Service"}
      >
        <UpdateExtraService
          setEditModal={setEditModal}
          id={target?._id}
          toggleFetch={toggleFetch}
        />
      </Modal>
      {/* <Modal isOpen={viewModal} onClose={setViewModal} title={"View Level"}>
          <ViewLevel />
        </Modal> */}
      {archiveModal && (
        <ArchiveModal
          isOpen={archiveModal}
          onClose={() => setArchiveModal(false)}
          item={target}
          toggleFetch={toggleFetch}
          api={`${target.isActive ? ARCHIVE_LEVEL_API : UNARCHIVE_LEVEL_API}${
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

export default ExtraServices;
