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
import { useEffect } from "react";
import { useAxiosInstance } from "../../../Hooks/Instances/useAxiosInstance";
import {
  MANAGE_EDUCATION_API,
} from "../../../Utilities/APIs/APIs";
import CreateEducation from "./CreateEducation";
import UpdateEducation from "./UpdateEducation";
import CustomHeader from "../../../Components/Partials/CustomHeader/CustomHeader";

// import ViewEducation from "./ViewEducation";

function Educations() {
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
      const { data: educationData, status } = await axiosInstance.get(
        `${MANAGE_EDUCATION_API}?filter=${filter}`,
        {
          params: {
            page: paginationState.currentPage,
            limit: paginationState.limit,
          },
        }
      );
      if (status === 200) {
        console.log(educationData)
        setData(educationData?.data);
        // setTotalPages(educationData?.totalPages);
        // setTotalData(educationData?.totalItems);
      } else {
        console.error("Failed to fetch Educations:");
      }
    }
    fetchData();
  }, [toggle, filter]);

  const headers = [{ label: "Institute" }, { label: "Department" }, { label: "From" }, { label: "To" }];

  return (
    <CardLayout>
      <CustomHeader title={"Educations"} btnName={"Education"} createModal={createModal} setCreateModal={setCreateModal} hasCreate={true}/>

      <CLTable>
        <CLTableHeader headers={headers} hasActions={true} />
        <CLTableBody>
          {data?.length > 0
            ? data.map((education) => (
                <CLTableRow key={education._id}>
                  <CLTableCell text={education?.institute} />
                  <CLTableCell text={education?.department} />
                  <CLTableCell text={education?.from} />
                  <CLTableCell text={education?.to} />
                  {/* <CLTableCell text={education?.level?.name} /> */}

                  <CLTableActionButtons
                    isActive={education?.isActive}
                    target={education}
                    hasView={false}
                    hasEdit={education.isActive}
                    editBtnProps={{ setEditModal, setTarget }}
                    archiveBtnProps={{ setArchiveModal, setTarget }}
                  />
                </CLTableRow>
              ))
            : null}
        </CLTableBody>
      </CLTable>
      <CLTableFooter
        dataLabel="Educations"
        hasPagination={true}
        paginationState={paginationState}
        paginationDispatch={setPaginationState}
      />

      <Modal
        isOpen={createModal}
        onClose={setCreateModal}
        title={"Create New Education"}
      >
        <CreateEducation
          setCreateModal={setCreateModal}
          toggleFetch={toggleFetch}
        />
      </Modal>

      <Modal isOpen={editModal} onClose={setEditModal} title={"Update Education"}>
        <UpdateEducation
          setEditModal={setEditModal}
          id={target?._id}
          toggleFetch={toggleFetch}
        />
      </Modal>
      {/* <Modal isOpen={viewModal} onClose={setViewModal} title={"View Education"}>
          <ViewEducation />
        </Modal> */}
      {archiveModal && (
        <ArchiveModal
          isOpen={archiveModal}
          onClose={() => setArchiveModal(false)}
          item={target}
          toggleFetch={toggleFetch}
          api={`${MANAGE_EDUCATION_API}${target?._id}`}
          axiosInstance={axiosInstance}
          successMessage={`${target?.name} has been archived`}
          isArchive={target?.isActive}
          title={target?.name}
        />
      )}
    </CardLayout>
  );
}

export default Educations;
