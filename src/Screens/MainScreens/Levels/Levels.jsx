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
import { CLUseNavigate } from "@antopolis/admin-component-library/dist/helper";
import { FaBoxOpen } from "react-icons/fa6";
import CreateLevel from "./components/CreateLevel";
import UpdateLevel from "./components/UpdateLevel";

// import ViewLevel from "./ViewLevel";

function Levels() {
  const axiosInstance = useAxiosInstance();
  const navigate = CLUseNavigate();
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
        `${MANAGE_LEVEL_API}?filter=${filter}`,
        {
          params: {
            page: paginationState.currentPage,
            limit: paginationState.limit,
          },
        }
      );
      if (status === 200) {
        setData(data?.levels);
        setTotalPages(data?.totalPages);
        setTotalData(data?.totalItems);
      } else {
        console.error("Failed to fetch qualifications:");
      }
    }
    fetchData();
  }, [toggle, filter, paginationState.currentPage, paginationState.limit]);

  const headers = [{ label: "Name", className: "w-full" }];

  return (
    <CardLayout>
      <Header
        heading="Qualifications"
        openModal={setCreateModal}
        modalLabel="Create New Qualification"
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
            ? data.map((level) => (
                <CLTableRow key={level?._id}>
                  <CLTableCell text={level?.name} />
                  <CLTableActionButtons
                    isActive={level?.isActive}
                    target={level}
                    hasView={false}
                    hasEdit={level.isActive}
                    editBtnProps={{ setEditModal, setTarget }}
                    archiveBtnProps={{ setArchiveModal, setTarget }}
                    extraAction
                    extraActions={[
                      {
                        onClick: () => {
                          navigate(`/main/levels/${level._id}`);
                        },
                        btnProps: {
                          icon: FaBoxOpen,
                          tooltipText: "Sub Levels",
                          toolTipContainerClassName:
                            "!text-slate-500  hover:!bg-slate-500 hover:!text-white",
                          toolTipClassName: "hover:!text-white ",
                        },
                      },
                    ]}
                  />
                </CLTableRow>
              ))
            : null}
        </CLTableBody>
      </CLTable>
      <CLTableFooter
        dataLabel="qualifications"
        hasPagination={true}
        paginationState={paginationState}
        setPaginationState={setPaginationState}
        paginationDispatch={setPaginationState}
      />

      <Modal
        isOpen={createModal}
        onClose={setCreateModal}
        title={"Create New Qualification"}
      >
        <CreateLevel
          setCreateModal={setCreateModal}
          toggleFetch={toggleFetch}
        />
      </Modal>

      <Modal
        isOpen={editModal}
        onClose={setEditModal}
        title={"Update Qualification"}
      >
        <UpdateLevel
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

export default Levels;
