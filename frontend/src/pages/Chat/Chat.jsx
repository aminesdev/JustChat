import Layout from '@/components/layout/Layout';

const Chat = () => {
    return (
        <Layout>
            <div className="flex items-center justify-center h-full text-muted-foreground">
                <div className="text-center">
                    <h2 className="text-2xl font-bold mb-2">Welcome to JustChat</h2>
                    <p>Select a conversation to start chatting</p>
                </div>
            </div>
        </Layout>
    );
};

export default Chat;