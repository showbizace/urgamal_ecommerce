import { Button, Group, Modal, Text } from "@mantine/core";
export function DeleteConfirmationDialog({
  isOpen,
  close,
  confirmationText,
  thingToDelete = {},
  onConfirm,
  loading,
}) {
  return (
    <Modal opened={isOpen} onClose={close} title={confirmationText} centered>
      <Text size="sm" weight={500} p="xs">
        {thingToDelete?.name}
      </Text>
      <Group position="right" mt="xl">
        <Button variant="default" onClick={close}>
          Цуцлах
        </Button>
        <Button
          type="submit"
          loading={loading}
          onClick={(e) => onConfirm(thingToDelete?.id)}
          color="red"
        >
          Устгах
        </Button>
      </Group>
    </Modal>
  );
}
