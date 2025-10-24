import {useState, useRef} from 'react';
import {Button} from '@/components/ui/button';
import {Input} from '@/components/ui/input';
import {useMessageStore} from '@/stores/messageStore';
import {Send, Image, Loader2} from 'lucide-react';
import {uploadService} from '@/services/uploadService';
import {validateFileUpload} from '@/utils/validationUtils';

const MessageInput = ({conversationId}) => {
    const [messageText, setMessageText] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [uploadProgress, setUploadProgress] = useState(0);
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

        // Validate file
        const validationError = validateFileUpload(file);
        if (validationError) {
            console.error('Image validation error:', validationError);
            // You might want to show a toast notification here
            return;
        }

        setIsLoading(true);
        setUploadProgress(0);

        try {
            console.log('Starting image upload...', file.name, file.size);

            // Upload image to server
            const uploadResponse = await uploadService.uploadImage(file, 'message');
            console.log('Upload response:', uploadResponse);

            const imageUrl = uploadResponse.data.url;
            const publicId = uploadResponse.data.public_id;

            // Send message with image
            await sendMessage(conversationId, {
                message_text: '', // Empty for image messages
                message_type: 'IMAGE',
                file_url: imageUrl,
                file_public_id: publicId // Store public_id for potential deletion
            });

            console.log('Image message sent successfully');

            // Reset file input
            if (fileInputRef.current) {
                fileInputRef.current.value = '';
            }
        } catch (error) {
            console.error('Failed to upload and send image:', error);
            // Show error to user
        } finally {
            setIsLoading(false);
            setUploadProgress(0);
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
                        disabled={isLoading}
                    />

                    <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        onClick={() => fileInputRef.current?.click()}
                        disabled={isLoading}
                        title="Upload image"
                    >
                        {isLoading ? (
                            <Loader2 className="h-4 w-4 animate-spin" />
                        ) : (
                            <Image className="h-4 w-4" />
                        )}
                    </Button>

                    <div className="flex-1 relative">
                        <Input
                            value={messageText}
                            onChange={(e) => setMessageText(e.target.value)}
                            onKeyPress={handleKeyPress}
                            placeholder="Type a message..."
                            disabled={isLoading}
                            className="w-full pr-10"
                        />
                        {isLoading && uploadProgress > 0 && (
                            <div className="absolute bottom-0 left-0 right-0 h-1 bg-muted">
                                <div
                                    className="h-full bg-primary transition-all duration-300"
                                    style={{width: `${uploadProgress}%`}}
                                />
                            </div>
                        )}
                    </div>

                    <Button
                        type="submit"
                        size="icon"
                        disabled={(!messageText.trim() && !isLoading) || isLoading}
                    >
                        {isLoading ? (
                            <Loader2 className="h-4 w-4 animate-spin" />
                        ) : (
                            <Send className="h-4 w-4" />
                        )}
                    </Button>
                </div>
            </form>
        </div>
    );
};

export default MessageInput;