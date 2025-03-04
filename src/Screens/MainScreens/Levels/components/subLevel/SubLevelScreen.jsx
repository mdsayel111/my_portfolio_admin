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
import { useEffect, useState } from "react";

import {
  CLUseNavigate,
  CLUseParams,
} from "@antopolis/admin-component-library/dist/helper";
import { CiCalendarDate } from "react-icons/ci";
import { IoBookOutline } from "react-icons/io5";
import { useAxiosInstance } from "../../../../../Hooks/Instances/useAxiosInstance";
import {
  ARCHIVE_SUBLEVEL_API,
  MANAGE_LEVEL_API,
  MANAGE_SUBLEVEL_API,
  UNARCHIVE_SUBLEVEL_API,
} from "../../../../../Utilities/APIs/APIs";
import CreateSubLevel from "./components/CreateSubLevel";
import UpdateSubLevel from "./components/UpdateLevel";
// import { FaCalendar } from "react-icons/fa";

function SubLevel() {
  const axiosInstance = useAxiosInstance();
  const { id } = CLUseParams();
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

  const navigate = CLUseNavigate();

  const [pageData, setPageData] = useState(null);

  useEffect(() => {
    async function fetchData() {
      const { data: levelData } = await axiosInstance.get(
        `${MANAGE_LEVEL_API}${id}`
      );
      setPageData(levelData);
    }
    fetchData();
  }, [id]);

  useEffect(() => {
    async function fetchData() {
      const { data: levelData, status } = await axiosInstance.get(
        `${MANAGE_SUBLEVEL_API}?level=${id}&filter=${filter}`,
        {
          params: {
            page: paginationState.currentPage,
            limit: paginationState.limit,
          },
        }
      );
      if (status === 200) {
        setData(levelData?.data);
      } else {
        console.error("Failed to fetch qualifications:");
      }
    }
    fetchData();
  }, [toggle, filter]);

  const headers = [{ label: "Name", className: "w-full" }];

  return (
    <CardLayout>
      <Header
        heading={pageData?.name + "'s Sub Qualifications"}
        openModal={setCreateModal}
        modalLabel="Create New Sub Qualification"
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
                <CLTableRow key={board?._id}>
                  <CLTableCell text={board?.name} />
                  <CLTableActionButtons
                    isActive={board?.isActive}
                    target={board}
                    hasView={false}
                    hasEdit={board.isActive}
                    editBtnProps={{ setEditModal, setTarget }}
                    archiveBtnProps={{ setArchiveModal, setTarget }}
                    extraAction
                    extraActions={[
                      {
                        onClick: () => {
                          navigate(`/main/levels/subjects/${board?._id}`);
                        },
                        btnProps: {
                          icon: IoBookOutline,
                          tooltipText: "Subjects",
                          toolTipContainerClassName:
                            "!text-slate-500  hover:!bg-slate-500 hover:!text-white",
                          toolTipClassName: "hover:!text-white ",
                        },
                      },
                      {
                        onClick: () => {
                          navigate(`/main/levels/packages/${board?._id}`);
                        },
                        btnProps: {
                          icon: CiCalendarDate,
                          tooltipText: "Reg. and Price",
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
        dataLabel="Sub qualifications"
        hasPagination={true}
        paginationState={paginationState}
        paginationDispatch={setPaginationState}
      />

      <Modal
        isOpen={createModal}
        onClose={setCreateModal}
        title={"Create New Sub Qualification"}
      >
        <CreateSubLevel
          id={id}
          setCreateModal={setCreateModal}
          toggleFetch={toggleFetch}
        />
      </Modal>

      <Modal
        isOpen={editModal}
        onClose={setEditModal}
        title={"Update Sub Qualification"}
      >
        <UpdateSubLevel
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
          api={`${
            target.isActive ? ARCHIVE_SUBLEVEL_API : UNARCHIVE_SUBLEVEL_API
          }${target?._id}`}
          axiosInstance={axiosInstance}
          successMessage={`${target?.name} has been archived`}
          isArchive={target?.isActive}
          title={target?.name}
        />
      )}
    </CardLayout>
  );
}

export default SubLevel;
