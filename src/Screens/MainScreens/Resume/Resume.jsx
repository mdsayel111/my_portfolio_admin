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
import CreateResume from "./CreateResume";
import { useEffect } from "react";
import {
  MANAGE_RESUME_API,
} from "../../../Utilities/APIs/APIs";
import { useAxiosInstance } from "../../../Hooks/Instances/useAxiosInstance";
import UpdateResume from "./UpdateResume";

function Resume() {
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
      const { data: resumeData, status } = await axiosInstance.get(
        `${MANAGE_RESUME_API}`
      );
      if (status === 200) {
        setData(resumeData?.data);
      } else {
        console.error("Failed to fetch resume!");
      }
    }
    fetchData();
  }, [toggle, filter]);

  const headers = [
    { label: "Image", className: "min-w-24" },
    { label: "Link", className: "min-w-24" },
  ];
  return (
    <CardLayout>
      <Header
        heading="Resume"
        openModal={setCreateModal}
        modalLabel="Create New Resume"
        searchPlaceholder="Search Resume"
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
          <CLTableRow>
          <CLTableImageCell
              url={data?.resumeImgLink}
              altText={'...'}
            />
            <CLTableCell text={data?.resumeLink} />
            <CLTableActionButtons
              // isActive={data?.isActive}
              target={data}
              hasView={false}
              hasArchive={false}
              // hasEdit={data.isActive}
              editBtnProps={{ setEditModal, setTarget }}
              archiveBtnProps={{ setArchiveModal, setTarget }}
            />
          </CLTableRow>
        </CLTableBody>
      </CLTable>
      <CLTableFooter
        dataLabel="Resume"
        hasPagination={true}
        paginationState={paginationState}
        paginationDispatch={setPaginationState}
      />

      <Modal isOpen={editModal} onClose={setEditModal} title={"Update Resume"}>
        <UpdateResume
          setEditModal={setEditModal}
          id={target?._id}
          toggleFetch={toggleFetch}
        />
      </Modal>
    </CardLayout>
  );
}

export default Resume;
