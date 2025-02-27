import React from 'react';

interface MessageProps {
    sender: string;
    content: string;
    timestamp: string;
}

const Message: React.FC<MessageProps> = ({ sender, content, timestamp }) => {
    return (
        <div className="message">
            <div className="message-header">
                <strong>{sender}</strong> <span>{timestamp}</span>
            </div>
            <div className="message-content">
                {content}
            </div>
        </div>
    );
};

export default Message;