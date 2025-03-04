import { useEffect } from "react";
import { useAxiosInstance } from "../../../../Hooks/Instances/useAxiosInstance";
import {
  toast,
  useEntityState,
} from "@antopolis/admin-component-library/dist/hooks";
import {
  IMAGE_URL,
  MANAGE_APP_SETTING_API,
} from "../../../../Utilities/APIs/APIs";
import { CardLayout } from "@antopolis/admin-component-library/dist/layout";
import {
  CLTable,
  CLTableActionButtons,
  CLTableBody,
  CLTableCell,
  CLTableFooter,
  CLTableHeader,
  CLTableImageCell,
  CLTableRow,
  Header,
  Modal,
} from "@antopolis/admin-component-library/dist/elements"; 
import CreateAppSetting from "./CreateAppSetting";

function AppSettings() {
  const axiosInstance = useAxiosInstance();
  const {
    data,
    setData,
    setFilter,
    setEditModal,
    editModal,
    createModal,
    setCreateModal,
    archiveModal,
    setArchiveModal,
    filter,
    toggleFilter,
    toggleFilterValue,
    setToggleFilter,
    target,
    setTarget,
    toggleFetch,
    toggle,
    paginationState,
    setPaginationState,
    setTotalPages,
    setTotalData,
  } = useEntityState();

  useEffect(() => {
    async function fetchData() {
      const { data: appSettingData, status } = await axiosInstance.get(
        `${MANAGE_APP_SETTING_API}?filter=${filter}`,
        {
          params: {
            page: paginationState.currentPage,
            limit: paginationState.limit,
          },
        }
      );
      if (status === 200) {
        setData(appSettingData);
        setTotalPages(appSettingData?.totalPages);
        setTotalData(appSettingData?.totalItems);
      } else {
        toast({
          variant: "destructive",
          title: "Error",
          description: `Failed to fetch App Settings data`,
        });
      }
    }
    fetchData();
  }, [toggle, filter]);

  console.log("App Setting Data", data);

  const headers = [
    { label: "Name", className: "min-w-24" },
    { label: "Image", className: "min-w-36 max-lg:hidden" },
    // { label: "Actions", className: "min-w-24" },
  ];

  return (
    <CardLayout>
      <Header
        heading="App Settings"
        openModal={setCreateModal}
        modalLabel="Create New App Setting"
        searchPlaceholder="Search App Setting"
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

      <CLTable containerClassName="" tableClassName="">
        <CLTableHeader headers={headers} hasActions={true} />
        <CLTableBody className="">
          {data?.length > 0 &&
            data.map((item, index) => (
              <CLTableRow key={index} className="">
                <CLTableCell className="" text={item?.name} />
                <CLTableImageCell className={"size-20"} url={IMAGE_URL + item?.image} />
                <CLTableActionButtons
                  isActive={item.isActive || true}
                  target={item}
                  hasView={false}
                  editBtnProps={{ setEditModal, setTarget }}
                  archiveBtnProps={{ setArchiveModal, setTarget }}
                />
              </CLTableRow>
            ))}
        </CLTableBody>
      </CLTable>
      <CLTableFooter
        dataLabel="Course"
        paginationState={paginationState}
        paginationDispatch={setPaginationState}
      />

      <Modal
        isOpen={createModal}
        onClose={setCreateModal}
        title={"Create App Setting"}
      >
        <CreateAppSetting
          setCreateModal={setCreateModal}
          toggleFetch={toggleFetch}
        />
      </Modal>

      {/* <Modal isOpen={editModal} onClose={setEditModal} title={"Update Course"}>
        <UpdateRestaurant
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
          api={`${ARCHIVE_RESTAURANT_API}${target?._id}`}
          axiosInstance={axiosInstance}
          successMessage={`${target?.name} has been archived`}
          isArchive={target?.isActive}
          title={target?.courseName}
        />
      )} */}
    </CardLayout>
  );
}

export default AppSettings;
