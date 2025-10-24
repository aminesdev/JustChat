import {useState, useRef} from 'react';
import {Button} from '@/components/ui/button';
import {Input} from '@/components/ui/input';
import {useMessageStore} from '@/stores/messageStore';
import {Send, Image} from 'lucide-react';
import {uploadService} from '@/services/uploadService';
import {validateFileUpload} from '@/utils/validationUtils';

const MessageInput = ({conversationId}) => {
    const [messageText, setMessageText] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const fileInputRef = useRef(null);
    const {sendMessage} = useMessageStore();

    const handleSendMessage = async (e) => {
        e.preventDefault();

        if (!messageText.trim() || !conversationId || isLoading) return;

        const textToSend = messageText.trim();
        setMessageText('');
        setIsLoading(true);

        try {
            await sendMessage(conversationId, {
                message_text: textToSend,
                message_type: 'TEXT'
            });
        } catch (error) {
            console.error('Failed to send message:', error);
            setMessageText(textToSend);
        } finally {
            setIsLoading(false);
        }
    };

    const handleImageUpload = async (e) => {
        const file = e.target.files[0];
        if (!file || !conversationId || isLoading) return;

        const validationError = validateFileUpload(file);
        if (validationError) {
            console.error('Image validation error:', validationError);
            return;
        }

        setIsLoading(true);

        try {
            const uploadResponse = await uploadService.uploadImage(file, 'message');
            const imageUrl = uploadResponse.data.url;

            await sendMessage(conversationId, {
                message_text: '',
                message_type: 'IMAGE',
                file_url: imageUrl
            });

            fileInputRef.current.value = '';
        } catch (error) {
            console.error('Failed to upload and send image:', error);
        } finally {
            setIsLoading(false);
        }
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSendMessage(e);
        }
    };

    if (!conversationId) {
        return (
            <div className="border-t border-border p-4 h-16 flex items-center w-full">
                <div className="flex items-center justify-center text-muted-foreground text-sm w-full">
                    Select a conversation to start messaging
                </div>
            </div>
        );
    }

    return (
        <div className="border-t border-border p-4 h-16 flex items-center w-full">
            <form onSubmit={handleSendMessage} className="flex items-center gap-2 w-full">
                <div className="flex items-center gap-2 flex-1">
                    <input
                        type="file"
                        ref={fileInputRef}
                        onChange={handleImageUpload}
                        accept="image/*"
                        className="hidden"
                    />

                    <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        onClick={() => fileInputRef.current?.click()}
                        disabled={isLoading}
                    >
                        <Image className="h-4 w-4" />
                    </Button>

                    <div className="flex-1">
                        <Input
                            value={messageText}
                            onChange={(e) => setMessageText(e.target.value)}
                            onKeyPress={handleKeyPress}
                            placeholder="Type a message..."
                            disabled={isLoading}
                            className="w-full"
                        />
                    </div>

                    <Button
                        type="submit"
                        size="icon"
                        disabled={!messageText.trim() || isLoading}
                    >
                        <Send className="h-4 w-4" />
                    </Button>
                </div>
            </form>
        </div>
    );
};

export default MessageInput;