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
  ARCHIVE_PACKAGE_API,
  MANAGE_PACKAGE_API,
  UNARCHIVE_PACKAGE_API,
} from "../../../Utilities/APIs/APIs";
import { useAxiosInstance } from "../../../Hooks/Instances/useAxiosInstance";
import UpdatePackage from "./UpdatePackage";
import CreatePackage from "./CreatePackage";
import { CLUseParams } from "@antopolis/admin-component-library/dist/helper";

// import ViewPackage from "./ViewPackage";

function Packages() {
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
        `${MANAGE_PACKAGE_API}${subLevelId}?filter=${filter}`
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
        console.error("Failed to fetch Packages:");
      }
    }
    fetchData();
  }, [toggle, filter]);

  const headers = [
    { label: "title" },
    { label: "date" },
    { label: "price" },
  ];

  return (
    <CardLayout>
      <Header
        heading="Packages"
        openModal={setCreateModal}
        modalLabel="Create New Package"
        searchPlaceholder="Search Package"
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
            ? data.map((singlePackage) => (
                <CLTableRow key={singlePackage?._id}>
                  <CLTableCell text={singlePackage?.title} />
                  <CLTableCell text={new Date(singlePackage?.date).toLocaleDateString()} />
                  <CLTableCell text={singlePackage?.price} />
                  {/* <CLTableCell text={singlePackage?.board?.name} />
                  <CLTableCell text={singlePackage?.subject?.name} /> */}

                  <CLTableActionButtons
                    isActive={singlePackage?.isActive}
                    target={singlePackage}
                    hasView={false}
                    hasEdit={singlePackage.isActive}
                    editBtnProps={{ setEditModal, setTarget }}
                    archiveBtnProps={{ setArchiveModal, setTarget }}
                  />
                </CLTableRow>
              ))
            : null}
        </CLTableBody>
      </CLTable>
      <CLTableFooter
        dataLabel="Packages"
        hasPagination={true}
        paginationState={paginationState}
        paginationDispatch={setPaginationState}
      />

      <Modal
        isOpen={createModal}
        onClose={setCreateModal}
        title={"Create New Package"}
      >
        <CreatePackage
          setCreateModal={setCreateModal}
          toggleFetch={toggleFetch}
        />
      </Modal>

      <Modal isOpen={editModal} onClose={setEditModal} title={"Update Package"}>
        <UpdatePackage
          setEditModal={setEditModal}
          id={target?._id}
          toggleFetch={toggleFetch}
        />
      </Modal>
      {/* <Modal isOpen={viewModal} onClose={setViewModal} title={"View Package"}>
          <ViewPackage />
        </Modal> */}
      {archiveModal && (
        <ArchiveModal
          isOpen={archiveModal}
          onClose={() => setArchiveModal(false)}
          item={target}
          toggleFetch={toggleFetch}
          api={`${
            target.isActive ? ARCHIVE_PACKAGE_API : UNARCHIVE_PACKAGE_API
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

export default Packages;
