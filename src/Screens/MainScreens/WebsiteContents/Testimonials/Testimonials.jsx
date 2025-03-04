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
import CreateTestimonial from "./CreateTestimonial";
import { useEffect } from "react";
import {
  ARCHIVE_TESTIMONIAL_API,
  IMAGE_URL,
  MANAGE_TESTIMONIAL_API,
  UNARCHIVE_TESTIMONIAL_API,
} from "../../../../Utilities/APIs/APIs";
import { useAxiosInstance } from "../../../../Hooks/Instances/useAxiosInstance";
import UpdateTestimonial from "./UpdateTestimonial";

function Testimonials() {
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
        `${MANAGE_TESTIMONIAL_API}?filter=${filter}`,
        {
          params: {
            page: paginationState.currentPage,
            limit: paginationState.limit,
          },
        }
      );
      if (status === 200) {
        setData(data?.testimonials);
        setTotalPages(data?.totalPages);
        setTotalData(data?.totalItems);
      } else {
        console.error("Failed to fetch testimonials:");
      }
    }
    fetchData();
  }, [toggle, filter, paginationState.currentPage, paginationState.limit]);

  const headers = [{ label: "Image" }, { label: "Name" }, { label: "Message" }];

  return (
    <CardLayout>
      <Header
        heading="Testimonials"
        openModal={setCreateModal}
        modalLabel="Create New Testimonial"
        searchPlaceholder="Search Testimonial"
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
            ? data.map((testimonial) => (
                <CLTableRow key={testimonial?._id}>
                  <CLTableImageCell url={IMAGE_URL + testimonial?.imageUrl} />
                  <CLTableCell text={testimonial?.name} />
                  <CLTableCell
                    className="max-lg:hidden"
                    text={testimonial?.message}
                  />
                  <CLTableActionButtons
                    isActive={testimonial?.isActive}
                    target={testimonial}
                    hasView={false}
                    hasEdit={testimonial.isActive}
                    editBtnProps={{ setEditModal, setTarget }}
                    archiveBtnProps={{ setArchiveModal, setTarget }}
                  />
                </CLTableRow>
              ))
            : null}
        </CLTableBody>
      </CLTable>
      <CLTableFooter
        dataLabel="Testimonials"
        hasPagination={true}
        paginationState={paginationState}
        setPaginationState={setPaginationState}
        paginationDispatch={setPaginationState}
      />

      <Modal
        isOpen={createModal}
        onClose={setCreateModal}
        title={"Create New Testimonial"}
      >
        <CreateTestimonial
          setCreateModal={setCreateModal}
          toggleFetch={toggleFetch}
        />
      </Modal>

      <Modal
        isOpen={editModal}
        onClose={setEditModal}
        title={"Update Testimonial"}
      >
        <UpdateTestimonial
          setEditModal={setEditModal}
          id={target?._id}
          toggleFetch={toggleFetch}
        />
      </Modal>
      {archiveModal && (
        <ArchiveModal
          isOpen={archiveModal}
          onClose={() => setArchiveModal(false)}
          item={target}
          toggleFetch={toggleFetch}
          api={`${
            target.isActive
              ? ARCHIVE_TESTIMONIAL_API
              : UNARCHIVE_TESTIMONIAL_API
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

export default Testimonials;
