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
import { useEffect, useState } from "react";
import {
  ARCHIVE_SUBJECT_API,
  MANAGE_SUBJECT_API,
  MANAGE_SUBLEVEL_API,
  UNARCHIVE_SUBJECT_API,
} from "../../../Utilities/APIs/APIs";
import { useAxiosInstance } from "../../../Hooks/Instances/useAxiosInstance";
import CreateSubject from "./CreateSubject";
import UpdateSubject from "./UpdateSubject";
import { CLUseParams } from "@antopolis/admin-component-library/dist/helper";

// import ViewSubject from "./ViewSubject";

function Subjects() {
  const [subLevelData, setSubLevelData] = useState({});
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
  const { subLevelId } = CLUseParams();

  useEffect(() => {
    async function fetchData() {
      const { data: subjectData, status } = await axiosInstance.get(
        `${MANAGE_SUBJECT_API}${subLevelId}?filter=${filter}`
        // {
        //   params: {
        //     page: paginationState.currentPage,
        //     limit: paginationState.limit,
        //   },
        // }
      );
      if (status === 200) {
        setData(subjectData);
        // setTotalPages(subjectData?.totalPages);
        // setTotalData(subjectData?.totalItems);
      } else {
        console.error("Failed to fetch Subjects:");
      }
    }
    fetchData();
  }, [toggle, filter]);

  useEffect(() => {
    async function fetchData() {
      const { data: subLevelData, status } = await axiosInstance.get(
        `${MANAGE_SUBLEVEL_API}${subLevelId}?filter=${filter}`
        // {
        //   params: {
        //     page: paginationState.currentPage,
        //     limit: paginationState.limit,
        //   },
        // }
      );
      if (status === 200) {
        console.log(subLevelData);
        setSubLevelData(subLevelData);
      } else {
        console.error("Failed to fetch Subjects:");
      }
    }
    fetchData();
  }, []);

  const headers = [{ label: "Name" }, { label: "Info" }, { label: "Code" }];

  return (
    <CardLayout>
      <Header
        heading={`${subLevelData?.name} Subjects`}
        openModal={setCreateModal}
        modalLabel="Create New Subject"
        searchPlaceholder="Search Subject"
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
            ? data.map((subject) => (
                <CLTableRow key={subject._id}>
                  <CLTableCell text={subject?.name} />
                  <CLTableCell text={subject?.info} />
                  <CLTableCell text={subject?.code} />
                  {/* <CLTableCell text={subject?.level?.name} /> */}

                  <CLTableActionButtons
                    isActive={subject?.isActive}
                    target={subject}
                    hasView={false}
                    hasEdit={subject.isActive}
                    editBtnProps={{ setEditModal, setTarget }}
                    archiveBtnProps={{ setArchiveModal, setTarget }}
                  />
                </CLTableRow>
              ))
            : null}
        </CLTableBody>
      </CLTable>
      <CLTableFooter
        dataLabel="Subjects"
        hasPagination={true}
        paginationState={paginationState}
        paginationDispatch={setPaginationState}
      />

      <Modal
        isOpen={createModal}
        onClose={setCreateModal}
        title={"Create New Subject"}
      >
        <CreateSubject
          setCreateModal={setCreateModal}
          toggleFetch={toggleFetch}
        />
      </Modal>

      <Modal isOpen={editModal} onClose={setEditModal} title={"Update Subject"}>
        <UpdateSubject
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
          item={target}
          toggleFetch={toggleFetch}
          api={`${
            target.isActive ? ARCHIVE_SUBJECT_API : UNARCHIVE_SUBJECT_API
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

export default Subjects;
