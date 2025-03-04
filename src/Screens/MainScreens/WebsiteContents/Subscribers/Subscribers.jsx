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
} from "@antopolis/admin-component-library/dist/elements";
import { useEntityState } from "@antopolis/admin-component-library/dist/hooks";
import { CardLayout } from "@antopolis/admin-component-library/dist/layout";
import { useEffect } from "react";
import { useAxiosInstance } from "../../../../Hooks/Instances/useAxiosInstance";
import {
  ARCHIVE_SUBSCRIBER_API,
  MANAGE_SUBSCRIBER_API,
  UNARCHIVE_SUBSCRIBER_API,
} from "../../../../Utilities/APIs/APIs";

function Subscribers() {
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
    setTotalPages,
    setTotalData,
    archiveModal,
  } = useEntityState();

  useEffect(() => {
    async function fetchData() {
      const { data, status } = await axiosInstance.get(
        `${MANAGE_SUBSCRIBER_API}?filter=${filter}`,
        {
          params: {
            page: paginationState.currentPage,
            limit: paginationState.limit,
          },
        }
      );
      if (status === 200) {
        setData(data?.subscribers);
        setTotalPages(data?.totalPages);
        setTotalData(data?.totalItems);
      } else {
        console.error("Failed to fetch subscribers:");
      }
    }
    fetchData();
  }, [toggle, filter]);

  const headers = [{ label: "Email" }];

  return (
    <CardLayout>
      <Header
        heading="Subscribers"
        openModal={setCreateModal}
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
            ? data.map((subscriber) => (
                <CLTableRow key={subscriber?._id}>
                  <CLTableCell text={subscriber?.email} />

                  <CLTableActionButtons
                    isActive={subscriber?.isActive}
                    target={subscriber}
                    hasView={false}
                    hasEdit={false}
                    archiveBtnProps={{ setArchiveModal, setTarget }}
                  />
                </CLTableRow>
              ))
            : null}
        </CLTableBody>
      </CLTable>
      <CLTableFooter
        dataLabel="Subscribers"
        hasPagination={true}
        paginationState={paginationState}
        paginationDispatch={setPaginationState}
      />

      {/* <Modal isOpen={viewModal} onClose={setViewModal} title={"View Subscriber"}>
        <ViewSubscriber />
      </Modal> */}
      {archiveModal && (
        <ArchiveModal
          isOpen={archiveModal}
          onClose={() => setArchiveModal(false)}
          item={{ ...target, name: target?.email }}
          toggleFetch={toggleFetch}
          api={`${
            target.isActive ? ARCHIVE_SUBSCRIBER_API : UNARCHIVE_SUBSCRIBER_API
          }${target?._id}`}
          axiosInstance={axiosInstance}
          successMessage={`${target?.name} has been archived`}
          isArchive={target?.isActive}
          title={target?.email}
        />
      )}
    </CardLayout>
  );
}

export default Subscribers;
