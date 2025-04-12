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
  MANAGE_EXPERIENCE_API,
} from "../../../Utilities/APIs/APIs";
import CreateExperience from "./CreateExperience";
import UpdateExperience from "./UpdateExperience";

// import ViewExperience from "./ViewExperience";

function Experiences() {
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
      const { data: experienceData, status } = await axiosInstance.get(
        `${MANAGE_EXPERIENCE_API}?filter=${filter}`,
        {
          params: {
            page: paginationState.currentPage,
            limit: paginationState.limit,
          },
        }
      );
      if (status === 200) {
        console.log(experienceData)
        setData(experienceData?.data);
        // setTotalPages(experienceData?.totalPages);
        // setTotalData(experienceData?.totalItems);
      } else {
        console.error("Failed to fetch Experiences:");
      }
    }
    fetchData();
  }, [toggle, filter]);

  const headers = [{ label: "Company" }, { label: "Position" }, { label: "From" }, { label: "To" }];

  return (
    <CardLayout>
      <Header
        heading={`Experiences`}
        openModal={setCreateModal}
        modalLabel="Create New Experience"
        searchPlaceholder="Search Experience"
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
            ? data.map((experience) => (
                <CLTableRow key={experience._id}>
                  <CLTableCell text={experience?.company} />
                  <CLTableCell text={experience?.position} />
                  <CLTableCell text={experience?.from} />
                  <CLTableCell text={experience?.to} />
                  {/* <CLTableCell text={experience?.level?.name} /> */}

                  <CLTableActionButtons
                    isActive={experience?.isActive}
                    target={experience}
                    hasView={false}
                    hasEdit={experience.isActive}
                    editBtnProps={{ setEditModal, setTarget }}
                    archiveBtnProps={{ setArchiveModal, setTarget }}
                  />
                </CLTableRow>
              ))
            : null}
        </CLTableBody>
      </CLTable>
      <CLTableFooter
        dataLabel="Experiences"
        hasPagination={true}
        paginationState={paginationState}
        paginationDispatch={setPaginationState}
      />

      <Modal
        isOpen={createModal}
        onClose={setCreateModal}
        title={"Create New Experience"}
      >
        <CreateExperience
          setCreateModal={setCreateModal}
          toggleFetch={toggleFetch}
        />
      </Modal>

      <Modal isOpen={editModal} onClose={setEditModal} title={"Update Experience"}>
        <UpdateExperience
          setEditModal={setEditModal}
          id={target?._id}
          toggleFetch={toggleFetch}
        />
      </Modal>
      {/* <Modal isOpen={viewModal} onClose={setViewModal} title={"View Experience"}>
          <ViewExperience />
        </Modal> */}
      {archiveModal && (
        <ArchiveModal
          isOpen={archiveModal}
          onClose={() => setArchiveModal(false)}
          item={target}
          toggleFetch={toggleFetch}
          api={`${MANAGE_EXPERIENCE_API}${target?._id}`}
          axiosInstance={axiosInstance}
          successMessage={`${target?.name} has been archived`}
          isArchive={target?.isActive}
          title={target?.name}
        />
      )}
    </CardLayout>
  );
}

export default Experiences;
