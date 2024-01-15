
echo "parameter 1" $1
echo "parameter 1" $2
echo "parameter 1" $3
echo "parameter 1" $4
echo "parameter 1" $5
echo "parameter 1" $6
 

export PATH=/QOpenSys/pkgs/lib/nodejs10/bin:$PATH;  
export LIBPATH=/QOpenSys/pkgs/lib/nodejs10/bin:$LIBPATH;
export NODE_PATH=/QOpenSys/pkgs/lib/nodejs10/node_modules:$NODE_PATH;
node -v;

node /Beesda2/NodeJS/Productie/AutotelexPRO/js/opvragenAutotelexpro.js $1 $2 $3 $4 $5 $6;
