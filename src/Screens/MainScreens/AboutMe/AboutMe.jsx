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
  MANAGE_ABOUT_ME_API,
} from "../../../Utilities/APIs/APIs";
import { useAxiosInstance } from "../../../Hooks/Instances/useAxiosInstance";
import UpdateAboutMe from "./UpdateAboutMe";
import CreateAboutMe from "./CreateAboutMe";

// import ViewAboutMe from "./ViewAboutMe";

function AboutMe() {
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
        `${MANAGE_ABOUT_ME_API}?filter=${filter}`,
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
    { label: "Description" }];

  return (
    <CardLayout>
      <Header
        heading="About Me"
        openModal={setCreateModal}
        modalLabel="Create New About Me"
        searchPlaceholder="Search About Me"
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

                <CLTableRow key={data._id}>
                <CLTableImageCell
              url={data?.image}
              altText={'...'}
            />
                  {/* <CLTableCell text={data?.title} /> */}
                  <CLTableCell text={data?.description} />

                  <CLTableActionButtons
                    isActive={data?.isActive}
                    target={data}
                    hasView={false}
                    hasEdit={true}
                    editBtnProps={{ setEditModal, setTarget }}
                    hasArchive={false}
                    // archiveBtnProps={{ setArchiveModal, setTarget }}
                  />
                </CLTableRow>

        </CLTableBody>
      </CLTable>
      <CLTableFooter
        dataLabel="AboutMe"
        hasPagination={true}
        paginationState={paginationState}
        setPaginationState={setPaginationState}
        paginationDispatch={setPaginationState}
      />

      <Modal
        isOpen={createModal}
        onClose={setCreateModal}
        title={"Create New AboutMe"}
      >
        <CreateAboutMe
          setCreateModal={setCreateModal}
          toggleFetch={toggleFetch}
        />
      </Modal>

      <Modal isOpen={editModal} onClose={setEditModal} title={"Update AboutMe"}>
        <UpdateAboutMe
          setEditModal={setEditModal}
          id={target?._id}
          toggleFetch={toggleFetch}
        />
      </Modal>
      {/* <Modal isOpen={viewModal} onClose={setViewModal} title={"View AboutMe"}>
          <ViewAboutMe />
        </Modal> */}
      {archiveModal && (
        <ArchiveModal
          isOpen={archiveModal}
          onClose={() => setArchiveModal(false)}
          item={target}
          toggleFetch={toggleFetch}
          api={`${target.isActive ? ARCHIVE_ABOUTME_API : UNARCHIVE_ABOUTME_API}${
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

export default AboutMe;
