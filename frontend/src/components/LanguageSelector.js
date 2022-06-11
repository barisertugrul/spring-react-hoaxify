import React from 'react';
import { useTranslation } from 'react-i18next';
import { changeLanguage } from '../api/apiCalls';

const LanguageSelector = (props) => {

    const { i18n } = useTranslation()
    
    const onChangeLanguage = language => {
        i18n.changeLanguage(language);
        changeLanguage(language);
    }

    return (
        <div className='container'>
                        <img 
                            src="https://flagcdn.com/24x18/tr.png" 
                            alt="Turkey" 
                            onClick={() => onChangeLanguage('tr')}
                            style={{ cursor: 'pointer' }}
                        />    
                        <img 
                            src="https://flagcdn.com/24x18/gb.png" 
                            alt="England" 
                            onClick={() => onChangeLanguage('en')}
                            style={{ cursor: 'pointer', marginLeft:'5px' }}
                        />
                    </div>
    );
};

export default LanguageSelector;