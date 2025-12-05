{ } :

let
  # Import the package set using the literal name you subscribed to locally
  stable = import <nixpkgs> {
    config = {
      allowUnfree = true;
    };
  };
  unstable = import <unstable> {
    config = {
      allowUnfree = true;
    };
  };

  # Decide which set of packages to use as the primary source
  pkgs = unstable; 

in
pkgs.mkShell {
  buildInputs = with pkgs; [
    # Core tools
    docker

    # Node.js and npm for React development
    nodejs_20

    # Additional utilities
    jq
    yq
    curl
    wget
    git
    gnumake
    claude-code

    # For documentation
    mdbook
  ];
}
