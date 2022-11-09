import {
  Alert,
  Button,
  Modal,
  SegmentedControl,
  Stack,
  Text,
  Textarea,
  TextInput,
} from '@mantine/core';
import {useForm} from '@mantine/form';
import {IconAlertCircle} from '@tabler/icons';
import {useState} from 'react';

import {ProjectThumbnailUploader} from 'components/project/project-thumbnail-uploader';

export interface NewProjectModalProps {
  opened: boolean;
  onClose: (refresh: boolean) => void;
}

export function NewProjectModal(props: NewProjectModalProps) {
  const {opened, onClose} = props;
  const [errorMessage, setErrorMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const form = useForm({
    initialValues: {
      name: '',
      source: '',
      description: '',
      defaultView: 'kanban',
    },

    validate: {
      name: value => value.length >= 3,
    },
  });

  return (
    <Modal
      centered
      closeOnClickOutside={false}
      opened={opened}
      onClose={() => onClose(false)}
      title="Add new project"
    >
      <form
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
        }}
      >
        {errorMessage ? (
          <Alert
            icon={<IconAlertCircle size={16} />}
            title="Error"
            color="red"
            mb={12}
            withCloseButton
            onClose={() => setErrorMessage('')}
          >
            {errorMessage}
          </Alert>
        ) : undefined}
        <Stack align="center">
          <ProjectThumbnailUploader width={190} height={126} />
        </Stack>
        <TextInput
          label="Name"
          placeholder="Project name"
          mb="sm"
          withAsterisk
          {...form.getInputProps('name')}
        />
        <TextInput
          label="Source"
          placeholder="e.g. https://youtube.com/..."
          mb="sm"
          {...form.getInputProps('source')}
        />
        <Textarea
          placeholder="Project description"
          label="Description"
          value={form.values.defaultView}
          mb="sm"
          {...form.getInputProps('description')}
        />
        <Stack spacing={2} mb="sm">
          <Text weight={500} size="sm">
            Default view
          </Text>
          <SegmentedControl
            data={[
              {label: 'Kanban', value: 'kanban'},
              {label: 'Table', value: 'table'},
            ]}
            {...form.getInputProps('defaultView', {type: 'checkbox'})}
          />
        </Stack>
        <Button fullWidth size="md" mt={6} loading={loading} type="submit">
          Add
        </Button>
      </form>
    </Modal>
  );
}
