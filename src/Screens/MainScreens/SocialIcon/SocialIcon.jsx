import {
  ArchiveModal,
  CLTable,
  CLTableActionButtons,
  CLTableBody,
  CLTableCell,
  CLTableFooter,
  CLTableHeader,
  CLTableRow,
  Modal
} from "@antopolis/admin-component-library/dist/elements";
import { useEntityState } from "@antopolis/admin-component-library/dist/hooks";
import { CardLayout } from "@antopolis/admin-component-library/dist/layout";
import { useEffect } from "react";
import CustomHeader from "../../../Components/Partials/CustomHeader/CustomHeader";
import { useAxiosInstance } from "../../../Hooks/Instances/useAxiosInstance";
import {
  MANAGE_SOCIAL_ICON_API,
} from "../../../Utilities/APIs/APIs";
import CreateSocialIcon from "./CreateSocialIcon";
import UpdateSocialIcon from "./UpdateSocialIcon";

// import ViewSocialIcon from "./ViewSocialIcon";

function SocialIcon() {
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
        `${MANAGE_SOCIAL_ICON_API}?filter=${filter}`,
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
      <CustomHeader title={"Projects"} btnName={"Project"} createModal={createModal} setCreateModal={setCreateModal} hasCreate={true} />

      <CLTable>
        <CLTableHeader headers={headers} hasActions={true} />
        <CLTableBody>

          {
            data?.map((socialIcon) => (<CLTableRow key={data._id}>
              <CLTableCell text={socialIcon?.name} />
              <CLTableCell text={socialIcon?.link} />
              <CLTableActionButtons
                isActive={socialIcon?.isActive}
                target={socialIcon}
                hasView={false}
                hasEdit={true}
                editBtnProps={{ setEditModal, setTarget }}
                hasArchive={true}
                archiveBtnProps={{ setArchiveModal, setTarget }}
              />
            </CLTableRow>))
          }

        </CLTableBody>
      </CLTable>
      <CLTableFooter
        dataLabel="SocialIcon"
        hasPagination={true}
        paginationState={paginationState}
        setPaginationState={setPaginationState}
        paginationDispatch={setPaginationState}
      />

      <Modal
        isOpen={createModal}
        onClose={setCreateModal}
        title={"Create New SocialIcon"}
      >
        <CreateSocialIcon
          setCreateModal={setCreateModal}
          toggleFetch={toggleFetch}
        />
      </Modal>

      <Modal isOpen={editModal} onClose={setEditModal} title={"Update SocialIcon"}>
        <UpdateSocialIcon
          setEditModal={setEditModal}
          id={target?._id}
          toggleFetch={toggleFetch}
        />
      </Modal>
      {/* <Modal isOpen={viewModal} onClose={setViewModal} title={"View SocialIcon"}>
          <ViewSocialIcon />
        </Modal> */}
      {archiveModal && (
        <ArchiveModal
          isOpen={archiveModal}
          onClose={() => setArchiveModal(false)}
          item={target}
          toggleFetch={toggleFetch}
          api={`${MANAGE_SOCIAL_ICON_API}${target?._id
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

export default SocialIcon;
