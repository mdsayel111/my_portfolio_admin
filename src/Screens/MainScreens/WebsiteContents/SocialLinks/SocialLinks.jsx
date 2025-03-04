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
  ARCHIVE_SOCIALLINK_API,
  IMAGE_URL,
  MANAGE_SOCIALLINK_API,
  UNARCHIVE_SOCIALLINK_API,
} from "../../../../Utilities/APIs/APIs";
import { useAxiosInstance } from "../../../../Hooks/Instances/useAxiosInstance";
import UpdateSocialLink from "./UpdateSocialLink";
import CreateSocialLink from "./CreateSocialLink";

function SocialLinks() {
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
      const { data: socialLinkData, status } = await axiosInstance.get(
        `${MANAGE_SOCIALLINK_API}?filter=${filter}`
        // {
        //   params: {
        //     page: paginationState.currentPage,
        //     limit: paginationState.limit,
        //   },
        // }
      );
      if (status === 200) {
        setData(socialLinkData);
        // setTotalPages(socialLinkData?.totalPages);
        // setTotalData(socialLinkData?.totalItems);
      } else {
        console.error("Failed to fetch socialLinks:");
      }
    }
    fetchData();
  }, [toggle, filter]);

  const headers = [{ label: "Name" }, { label: "link" }];

  return (
    <CardLayout>
      <Header
        heading="Social Links"
        openModal={setCreateModal}
        modalLabel="Create New Social Link"
        searchPlaceholder="Search Social Link"
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
            ? data.map((sl) => (
                <CLTableRow>
                  <CLTableCell text={sl?.name} />
                  <CLTableCell text={sl?.link} />
                  <CLTableActionButtons
                    isActive={sl?.isActive}
                    target={sl}
                    hasView={false}
                    hasEdit={sl.isActive}
                    editBtnProps={{ setEditModal, setTarget }}
                    archiveBtnProps={{ setArchiveModal, setTarget }}
                  />
                </CLTableRow>
              ))
            : null}
        </CLTableBody>
      </CLTable>
      <CLTableFooter
        dataLabel="Social links"
        hasPagination={true}
        paginationState={paginationState}
        paginationDispatch={setPaginationState}
      />

      <Modal
        isOpen={createModal}
        onClose={setCreateModal}
        title={"Create New Social link"}
      >
        <CreateSocialLink
          setCreateModal={setCreateModal}
          toggleFetch={toggleFetch}
        />
      </Modal>

      <Modal
        isOpen={editModal}
        onClose={setEditModal}
        title={"Update Sociallink"}
      >
        <UpdateSocialLink
          setEditModal={setEditModal}
          id={target?._id}
          toggleFetch={toggleFetch}
        />
      </Modal>
      {/* <Modal isOpen={viewModal} onClose={setViewModal} title={"View Sociallink"}>
        <ViewSociallink />
      </Modal> */}
      {archiveModal && (
        <ArchiveModal
          isOpen={archiveModal}
          onClose={() => setArchiveModal(false)}
          item={target}
          toggleFetch={toggleFetch}
          api={`${
            target.isActive ? ARCHIVE_SOCIALLINK_API : UNARCHIVE_SOCIALLINK_API
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

export default SocialLinks;
