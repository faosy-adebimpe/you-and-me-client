import MessagePageWrapper from './MessagePageWrapper';

const MessagePage = async ({ params }: { params: Promise<{ id: string }> }) => {
    const { id } = await params;

    return <MessagePageWrapper id={id} />;
};

export default MessagePage;
