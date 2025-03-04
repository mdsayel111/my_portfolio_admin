import { FormWrapper } from "@antopolis/admin-component-library/dist/form";
import { Button } from "@antopolis/admin-component-library/dist/pagination-a49ce60d";
import { toast } from "@antopolis/admin-component-library/dist/useToast-64602659";
import { useEffect, useState } from "react";
import { Loader2 } from "lucide-react";
import { useAxiosInstance } from "../../../Hooks/Instances/useAxiosInstance";
import {
  MANAGE_SUBJECT_BOARD_API,
  MANAGE_BOARD_API,
  MANAGE_SUBJECT_API,
} from "../../../Utilities/APIs/APIs";
import { SelectInput } from "@antopolis/admin-component-library/dist/inputs";
import useFetchItems from "../utils/useFetchItems";

export default function CreateSubjectBoardMap({
  setCreateModal,
  toggleFetch,
  ...props
}) {
  const [isLoading, setIsLoading] = useState(false);
  const axiosInstance = useAxiosInstance();

  const subjects = useFetchItems(MANAGE_SUBJECT_API);
  const boards = useFetchItems(MANAGE_BOARD_API);

  const [subjectOptions, setSubjectOptions] = useState([]);
  const [boardOptions, setBoardOptions] = useState([]);

  useEffect(() => {
    setSubjectOptions(
      subjects.map((subject) => ({
        value: subject._id,
        label: subject.name,
      }))
    );
    setBoardOptions(
      boards.map((board) => ({
        value: board._id,
        label: board.name,
      }))
    );
  }, [subjects, boards]);

  const handleSubmit = async (data) => {
    const formData = new FormData();
    formData.append("subject", data.subject);
    formData.append("board", data.board);

    try {
      setIsLoading(true);
      const response = await axiosInstance.post(
        MANAGE_SUBJECT_BOARD_API,
        formData
      );

      if (response.status === 200) {
        toggleFetch();
        setCreateModal(false);
        toast({
          title: "Success",
          description: "Subject-Board mapping created successfully",
          variant: "success",
        });
      } else {
        toast({
          title: "Failed",
          description: "Could not create mapping",
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: "Failed",
        description: "Could not create mapping",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <FormWrapper onSubmit={handleSubmit} {...props}>
      <SelectInput
        options={subjectOptions}
        name="subject"
        label="Subject"
        placeholder="Select Subject"
        rules={{ required: "Subject is required" }}
        className="mb-2"
      />
      <SelectInput
        options={boardOptions}
        name="board"
        label="Board"
        placeholder="Select Board"
        rules={{ required: "Board is required" }}
        className="mb-2"
      />
      <Button className="mt-6 w-full">
        {isLoading ? (
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
        ) : (
          "Create Connection"
        )}
      </Button>
    </FormWrapper>
  );
}
