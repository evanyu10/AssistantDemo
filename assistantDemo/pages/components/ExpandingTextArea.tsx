import React from 'react';

interface Props {
    isEditing: boolean;
    setIsEditing: (isEditing: boolean) => void;
    input: string;
    transcribedMessage?: any;
    handleInputChange: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
    onEnterPress: (event: any) => void;
  }
  
  export class ExpandingTextArea extends React.Component<Props> {
    textareaRef = React.createRef<HTMLTextAreaElement>();
  
    componentDidUpdate() {
      if (this.textareaRef.current) {
        this.textareaRef.current.style.height = 'inherit';
        this.textareaRef.current.style.height = `${this.textareaRef.current.scrollHeight}px`;
        //prevents scrollbar from appearing by default
        if (this.textareaRef.current.scrollHeight > 300) {
            this.textareaRef.current.style.overflowY = 'auto';
          } else {
            this.textareaRef.current.style.overflowY = 'hidden';
          }
    }

    }

    handleKeyDown = (e: any) => {
        if (e.key === 'Enter' && !e.shiftKey) {
          e.preventDefault();
          this.props.onEnterPress(e);
        }}
  
    render() {
      const { isEditing, setIsEditing, input, transcribedMessage, handleInputChange } = this.props;
  
      return (
        <textarea
          ref={this.textareaRef}
          value={isEditing ? input : (transcribedMessage || input)}
          onChange={(e) => {
            setIsEditing(true);
            handleInputChange(e);
          }}
          onKeyDown={this.handleKeyDown}
          style={{
            
            fontSize: '15px',
            width: '100%',
            resize: 'none',
            outline: 'none',
            border: '1px solid lightgray',
            borderRadius: '5px',
            overflow: 'hidden', //hides scrollbar on default
            padding: '10px', //padding between box outline and text
            lineHeight: '1.5',
            
            //keeps the box contained within the max height dynamically
            maxHeight: '300px', 
            overflowY: 'auto', 
          }}
          maxLength={1000}
          rows={1}
        />
      );
    }
  }
  
  // Usage

  