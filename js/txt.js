var txtData={
    data:function () {
        return{
            txt:{
                tx1:"输入名字",
                tx2:"输入电话",
                tx3:"输入地址",
                tx4:"输入地址1",
                tx5:"输入地址2",


                txtArr: [
                    {
                        question: "你很不会和别人吵架？",
                        ask: [
                            {value:"不仅会吵架还会中国功夫",to:10,class:""},
                            {value:"我这么萌，别人为什么要和我吵架",result:"D",class:""},
                        ],
                    },
                    {
                        question: "你是素食主义还是无肉不欢？",
                        ask: [
                            {value:"无肉不欢",result:"A",class:""},
                            {value:"心里想着肉口中吃着素",result:"E",class:""},
                        ],
                    },
                ]

            }
        }
    }
};



